import { supabase } from './supabaseClient';

export const supabaseDB = {
  // --- Auth & User Profile ---
  login: async (email, password) => {
    // Stage 1: Auth only (Fastest)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    
    // Stage 2: Background profile fetch (don't let it hang the whole login)
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();
      
      if (profile) return profile;
    } catch (e) {
      console.warn("Background profile fetch failed, using default.");
    }
    
    // Fallback immediately so the spinner stops
    return { id: data.user.id, role: 'student', email: data.user.email, name: 'User' };
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // --- Admin Methods ---
  getTeachers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'teacher');
    if (error) throw error;
    return data;
  },
  
  createTeacher: async (teacherData) => {
    // IMPORTANT: Standard auth.signUp will auto-login the new user.
    // To create users WITHOUT logging out Admin, you need to use:
    // a) Supabase Auth Admin API (requires service_role key - NOT FOR CLIENT)
    // b) Edge Function (Recommended)
    
    // For now, we will create the PROFILE. Access will depend on how you
    // invite the user to Auth.
    
    const { data, error } = await supabase
      .from('profiles')
      .insert([{
        name: teacherData.name,
        email: teacherData.email,
        mobile: teacherData.mobile,
        subject: teacherData.subject,
        batch_type: teacherData.batchType,
        role: 'teacher'
      }])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  // --- Teacher Methods ---
  getStudentsByTeacher: async (teacherId) => {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        profiles (
          name,
          email
        )
      `)
      .eq('teacher_id', teacherId);
    if (error) throw error;
    return data.map(s => ({
      ...s,
      name: s.profiles.name,
      email: s.profiles.email
    }));
  },

  createStudent: async (studentData) => {
    // 1. Create Profile First
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([{
        name: studentData.name,
        email: studentData.email,
        mobile: studentData.mobile,
        role: 'student'
      }])
      .select()
      .single();
      
    if (profileError) throw profileError;

    // 2. Create Student Detail
    const { data: student, error: studentError } = await supabase
      .from('students')
      .insert([{
        id: profile.id,
        teacher_id: studentData.teacherId,
        roll_number: studentData.rollNumber,
        class_id: studentData.classId,
        batch: studentData.batch,
        mobile: studentData.mobile
      }])
      .select()
      .single();

    if (studentError) throw studentError;
    return { ...profile, ...student };
  },

  // --- Attendance ---
  markAttendance: async (date, batch, attendanceData, teacherId) => {
    const { data, error } = await supabase
      .from('attendance')
      .upsert([{
        teacher_id: teacherId,
        date,
        batch,
        records: attendanceData
      }], { onConflict: 'date,batch,teacher_id' })
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  getAttendanceForStudent: async (studentId) => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*');
    
    if (error) throw error;
    
    const results = [];
    data.forEach(record => {
      const studentRecord = record.records.find(r => r.studentId === studentId);
      if (studentRecord) {
        results.push({ date: record.date, status: studentRecord.status });
      }
    });
    return results.sort((a,b) => new Date(b.date) - new Date(a.date));
  },

  // --- Marks ---
  uploadMarks: async (date, batch, subject, marksData, teacherId) => {
    const { data, error } = await supabase
      .from('marks')
      .insert([{
        teacher_id: teacherId,
        date,
        batch,
        subject,
        records: marksData
      }])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  getMarksForStudent: async (studentId) => {
    const { data, error } = await supabase
      .from('marks')
      .select('*');
    
    if (error) throw error;
    const results = [];
    data.forEach(record => {
      const studentRecord = record.records.find(r => r.studentId === studentId);
      if (studentRecord) {
        results.push({ date: record.date, subject: record.subject, mark: studentRecord.mark });
      }
    });
    return results.sort((a,b) => new Date(b.date) - new Date(a.date));
  },

  // --- Remarks ---
  addRemark: async (studentId, title, content, type, teacherId) => {
    const { data, error } = await supabase
      .from('remarks')
      .insert([{
        student_id: studentId,
        teacher_id: teacherId,
        title,
        content,
        type
      }])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  getRemarksForStudent: async (studentId) => {
    const { data, error } = await supabase
      .from('remarks')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};
