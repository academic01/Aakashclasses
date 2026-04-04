// Mock Database using LocalStorage for immediate functionality
// Later, this can be replaced entirely with Firebase calls.

const DB_KEY = 'aakash_coaching_db';

const initDB = () => {
  if (!localStorage.getItem(DB_KEY)) {
    const initialData = {
      users: [
        {
          id: 'admin_1',
          role: 'admin',
          email: 'admin@aakashclasses.com',
          password: 'admin', // In a real app, never store plain text passwords
          name: 'Supreme Admin'
        }
      ],
      students: [],
      attendance: [],
      marks: [],
      remarks: []
    };
    localStorage.setItem(DB_KEY, JSON.stringify(initialData));
  }
};

initDB();

const getDB = () => JSON.parse(localStorage.getItem(DB_KEY));
const saveDB = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db));

const generateId = () => Math.random().toString(36).substr(2, 9);

export const mockAuth = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getDB();
        const user = db.users.find(u => u.email === email && u.password === password);
        if (user) {
          // don't return password
          const { password: _, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500); // Simulate network delay
    });
  }
};

export const mockDB = {
  // --- Admin Methods ---
  getTeachers: async () => {
    const db = getDB();
    return db.users.filter(u => u.role === 'teacher');
  },
  
  createTeacher: async (teacherData) => {
    const db = getDB();
    // check if email exists
    if (db.users.find(u => u.email === teacherData.email)) {
      throw new Error("Email already exists");
    }
    const newTeacher = {
      ...teacherData,
      id: 'teacher_' + generateId(),
      role: 'teacher',
      createdAt: new Date().toISOString()
    };
    db.users.push(newTeacher);
    saveDB(db);
    return newTeacher;
  },

  // --- Teacher Methods ---
  getStudentsByTeacher: async (teacherId) => {
    const db = getDB();
    return db.students.filter(s => s.teacherId === teacherId);
  },

  createStudent: async (studentData) => {
    const db = getDB();
    if (db.users.find(u => u.email === studentData.email)) {
      throw new Error("Student Roll/Email already exists");
    }
    
    // Create Student user account
    const newStudentUser = {
      id: 'student_' + generateId(),
      role: 'student',
      email: studentData.email, // using Roll No or a generated email as login ID
      password: studentData.password, 
      name: studentData.name
    };
    
    // Create Student profile
    const newStudentProfile = {
      id: newStudentUser.id,
      teacherId: studentData.teacherId, // which teacher created them
      name: studentData.name,
      rollNumber: studentData.rollNumber,
      classId: studentData.classId,
      batch: studentData.batch,
      mobile: studentData.mobile,
      createdAt: new Date().toISOString()
    };

    db.users.push(newStudentUser);
    db.students.push(newStudentProfile);
    saveDB(db);
    return newStudentProfile;
  },

  // --- Attendance ---
  markAttendance: async (date, batch, attendanceData, teacherId) => {
    // attendanceData: array of { studentId, status: 'present' | 'absent' }
    const db = getDB();
    
    // remove existing for this date+batch if any to overwrite
    db.attendance = db.attendance.filter(a => !(a.date === date && a.batch === batch && a.teacherId === teacherId));
    
    const newRecord = {
      id: 'att_' + generateId(),
      date,
      batch,
      teacherId,
      records: attendanceData,
      createdAt: new Date().toISOString()
    };
    
    db.attendance.push(newRecord);
    saveDB(db);
    return newRecord;
  },

  getAttendanceForStudent: async (studentId) => {
    const db = getDB();
    // returns array of { date, status }
    const results = [];
    db.attendance.forEach(record => {
      const studentRecord = record.records.find(r => r.studentId === studentId);
      if (studentRecord) {
        results.push({ date: record.date, status: studentRecord.status });
      }
    });
    return results.sort((a,b) => new Date(b.date) - new Date(a.date));
  },

  // --- Marks ---
  uploadMarks: async (date, batch, subject, marksData, teacherId) => {
    const db = getDB();
    const newRecord = {
      id: 'mark_' + generateId(),
      date,
      batch,
      subject,
      teacherId,
      records: marksData, // { studentId, mark }
      createdAt: new Date().toISOString()
    };
    db.marks.push(newRecord);
    saveDB(db);
    return newRecord;
  },
  
  getMarksForStudent: async (studentId) => {
    const db = getDB();
    const results = [];
    db.marks.forEach(record => {
      const studentRecord = record.records.find(r => r.studentId === studentId);
      if (studentRecord) {
        results.push({ date: record.date, subject: record.subject, mark: studentRecord.mark });
      }
    });
    return results.sort((a,b) => new Date(b.date) - new Date(a.date));
  },

  // --- Remarks ---
  addRemark: async (studentId, title, content, type, teacherId) => {
    const db = getDB();
    const newRemark = {
      id: 'rem_' + generateId(),
      studentId,
      teacherId,
      title,
      content,
      type, // 'performance' | 'behavior'
      date: new Date().toISOString()
    };
    db.remarks.push(newRemark);
    saveDB(db);
    return newRemark;
  },
  
  getRemarksForStudent: async (studentId) => {
    const db = getDB();
    return db.remarks.filter(r => r.studentId === studentId).sort((a,b) => new Date(b.date) - new Date(a.date));
  }
};
