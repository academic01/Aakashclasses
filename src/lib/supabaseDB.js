import { supabase } from './supabaseClient';

export const supabaseDB = {
  // --- Auth & User Profile ---
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email: email.trim(), 
      password: password.trim() 
    });
    if (error) throw error;
    if (!data?.user) throw new Error("No user found");

    // Fetch full profile with role-specific details
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*, students!id(*)')
      .eq('id', data.user.id)
      .maybeSingle();
    
    if (profileError) throw profileError;

    // Merge student-specific data if it exists
    const mergedProfile = {
      ...profile,
      email: data.user.email,
      ...(profile?.students?.[0] || {}) // If role is student, merge their roll_number, etc.
    };

    return mergedProfile;
  },

  signup: async (email, password, name, mobile) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, mobile: mobile } }
    });
    if (error) throw error;
    
    if (data.user) {
      await supabase.from('profiles').insert([{ 
        id: data.user.id, 
        name, 
        email, 
        mobile, 
        role: 'student' 
      }]);
    }
    return data.user;
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // --- Admin ---
  getTeachers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'teacher')
      .order('name');
    if (error) throw error;
    return data;
  },
  
  createTeacher: async (teacherData) => {
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
      .select().single();
    if (error) throw error;
    return data;
  },

  // --- Teacher ---
  getStudentsByTeacher: async (teacherId, batch) => {
    // Fetch all students belonging to this teacher's batch
    const { data, error } = await supabase
      .from('students')
      .select('*, profiles(name, email)')
      .eq('batch', batch);
    if (error) throw error;
    return data.map(s => ({
      ...s,
      name: s.profiles?.name,
      email: s.profiles?.email,
      roll_number: s.roll_number,
      class_id: s.class_id
    }));
  },

  createStudent: async (studentData) => {
    const { data: profile, error: pErr } = await supabase
      .from('profiles')
      .insert([{
        name: studentData.name,
        email: studentData.email,
        mobile: studentData.mobile,
        role: 'student'
      }]).select().single();
    if (pErr) throw pErr;

    const { error: sErr } = await supabase
      .from('students')
      .insert([{
        id: profile.id,
        teacher_id: studentData.teacherId,
        roll_number: studentData.rollNumber,
        class_id: studentData.classId,
        batch: studentData.batch,
        mobile: studentData.mobile
      }]);
    if (sErr) throw sErr;
    return profile;
  },

  // --- Logs (Marks & Attendance) ---
  markAttendance: async (date, batch, records, teacherId) => {
    const { error } = await supabase
      .from('attendance')
      .upsert([{ teacher_id: teacherId, date, batch, records }], { onConflict: 'date,batch,teacher_id' });
    if (error) throw error;
  },

  getAttendanceForStudent: async (studentId) => {
    const { data, error } = await supabase.from('attendance').select('*').order('date', { ascending: false });
    if (error) throw error;
    return data.map(record => {
      const match = record.records.find(r => r.studentId === studentId);
      return match ? { date: record.date, status: match.status } : null;
    }).filter(Boolean);
  },

  uploadMarks: async (date, batch, subject, records, teacherId) => {
    const { error } = await supabase
      .from('marks')
      .insert([{ teacher_id: teacherId, date, batch, subject, records }]);
    if (error) throw error;
  },
  
  getMarksForStudent: async (studentId) => {
    const { data, error } = await supabase.from('marks').select('*').order('date', { ascending: false });
    if (error) throw error;
    return data.map(record => {
      const match = record.records.find(r => r.studentId === studentId);
      return match ? { date: record.date, subject: record.subject, mark: match.mark } : null;
    }).filter(Boolean);
  },

  addRemark: async (studentId, title, content, type, teacherId) => {
    const { error } = await supabase.from('remarks').insert([{ student_id: studentId, teacher_id: teacherId, title, content, type }]);
    if (error) throw error;
  },

  getRemarksForStudent: async (studentId) => {
    const { data, error } = await supabase.from('remarks').select('*').eq('student_id', studentId).order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // --- Doubts ---
  submitDoubt: async (studentId, title, content) => {
    const { error } = await supabase.from('doubts').insert([{ student_id: studentId, title, content, status: 'pending' }]);
    if (error) throw error;
  },

  getDoubtsByStudent: async (studentId) => {
    const { data, error } = await supabase.from('doubts').select('*').eq('student_id', studentId).order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  getDoubtsByTeacher: async () => {
    // For now, fetch all doubts. In production, add RLS to filter by batch/teacher.
    const { data, error } = await supabase
      .from('doubts')
      .select(`
        *,
        profiles!doubts_student_id_fkey (name)
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  resolveDoubt: async (doubtId, answer) => {
    const { error } = await supabase.from('doubts').update({ answer, status: 'resolved', resolved_at: new Date() }).eq('id', doubtId);
    if (error) throw error;
  },

  updateProfile: async (userId, profileData) => {
    const { data, error } = await supabase.from('profiles').update(profileData).eq('id', userId).select().single();
    if (error) throw error;
    return data;
  }
};
