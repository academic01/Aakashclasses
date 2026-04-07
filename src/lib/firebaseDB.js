import { db } from './firebase';
import { 
  collection, doc, setDoc, getDoc, getDocs, 
  query, where, updateDoc, addDoc, deleteDoc, 
  orderBy, serverTimestamp, limit 
} from 'firebase/firestore';

export const firebaseDB = {
  // --- Profiles (Users) ---
  getProfile: async (uid) => {
    const docRef = doc(db, 'profiles', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  updateProfile: async (uid, data) => {
    const docRef = doc(db, 'profiles', uid);
    return await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  },

  // --- Teacher Dashboard Functions ---
  getTeachers: async () => {
    const q = query(collection(db, 'profiles'), where('role', '==', 'teacher'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // --- Student Management (By Teacher) ---
  addStudent: async (studentData) => {
    // Note: Student's ID should ideally be their Firebase UID after they signup
    // But currently, teacher creates the record.
    const studentRef = collection(db, 'students');
    const docRef = await addDoc(studentRef, {
      ...studentData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  getStudentsByTeacher: async (teacherId, batch = null) => {
    let q = query(collection(db, 'students'), where('assignedTeacherId', '==', teacherId));
    if (batch) {
      q = query(q, where('batch', '==', batch));
    }
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // --- Attendance ---
  markAttendance: async (attendanceData) => {
    // attendanceData: { studentId, teacherId, date, status, batch }
    const ref = collection(db, 'attendance');
    return await addDoc(ref, {
      ...attendanceData,
      timestamp: serverTimestamp()
    });
  },

  getAttendanceByStudent: async (studentId) => {
    const q = query(collection(db, 'attendance'), where('studentId', '==', studentId), orderBy('date', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // --- Marks & Results ---
  uploadMarks: async (marksData) => {
    // marksData: { studentId, teacherId, testName, score, totalMarks, subject, date }
    const ref = collection(db, 'marks');
    return await addDoc(ref, {
      ...marksData,
      createdAt: serverTimestamp()
    });
  },

  getMarksByStudent: async (studentId) => {
    const q = query(collection(db, 'marks'), where('studentId', '==', studentId), orderBy('date', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // --- Doubts System ---
  submitDoubt: async (doubtData) => {
    // doubtData: { studentId, studentName, teacherId, question, subject }
    const ref = collection(db, 'doubts');
    return await addDoc(ref, {
      ...doubtData,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  },

  getDoubtsByTeacher: async (teacherId) => {
    const q = query(collection(db, 'doubts'), where('teacherId', '==', teacherId), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  getDoubtsByStudent: async (studentId) => {
    const q = query(collection(db, 'doubts'), where('studentId', '==', studentId), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  resolveDoubt: async (doubtId, answer) => {
    const docRef = doc(db, 'doubts', doubtId);
    return await updateDoc(docRef, {
      answer,
      status: 'resolved',
      resolvedAt: serverTimestamp()
    });
  },

  // --- Admin: Settings & Remark Tracking ---
  addWeeklyRemark: async (remarkData) => {
    const ref = collection(db, 'remarks');
    return await addDoc(ref, {
      ...remarkData,
      createdAt: serverTimestamp()
    });
  },
  
  getRemarksByStudent: async (studentId) => {
    const q = query(collection(db, 'remarks'), where('studentId', '==', studentId), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};
