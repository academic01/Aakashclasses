import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabaseDB } from '../../lib/supabaseDB';
import { LogOut, Users, UserPlus, CheckSquare, FileSpreadsheet, MessageSquare, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

const TeacherDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [view, setView] = useState('students'); // students, attendance, marks, remarks
  const [students, setStudents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Modals state
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      fetchStudents();
    }
  }, [currentUser]);

  const fetchStudents = async () => {
    try {
      const data = await supabaseDB.getStudentsByTeacher(currentUser.id);
      setStudents(data);
    } catch (err) {
      toast.error("Failed to load students");
    }
  };

  const SidebarBtn = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${view === id ? 'bg-brandBlue text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-exo text-textPrimary">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-brandNavy text-white transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-orbitron font-bold">Teacher<span className="text-brandBlue">Portal</span></span>
            <button className="lg:hidden text-gray-300" onClick={() => setSidebarOpen(false)}><X size={24}/></button>
          </div>
          
          <div className="flex items-center gap-3 mb-8 p-3 bg-white/10 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
              {currentUser?.name?.charAt(0) || 'T'}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">{currentUser?.name}</p>
              <p className="text-xs text-gray-300">{currentUser?.subject} | {currentUser?.batchType}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <SidebarBtn id="students" icon={Users} label="My Students" />
            <SidebarBtn id="attendance" icon={CheckSquare} label="Attendance" />
            <SidebarBtn id="marks" icon={FileSpreadsheet} label="Test Marks" />
            <SidebarBtn id="remarks" icon={MessageSquare} label="Remarks" />
          </nav>

          <button onClick={logout} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg font-semibold transition-all">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-brandNavy">
            <Menu size={24} />
          </button>
          <span className="font-orbitron font-bold text-brandNavy text-xl">Teacher<span className="text-brandBlue">Portal</span></span>
          <div className="w-6 hidden"></div>
        </header>

        <div className="flex-1 overflow-auto p-6 lg:p-10">
          
          {view === 'students' && (
            <StudentManagementView 
              students={students} 
              fetchStudents={fetchStudents} 
              teacher={currentUser}
            />
          )}

          {view === 'attendance' && (
            <AttendanceView students={students} teacher={currentUser} />
          )}

          {view === 'marks' && (
             <MarksView students={students} teacher={currentUser} />
          )}

          {view === 'remarks' && (
             <RemarksView students={students} teacher={currentUser} />
          )}

        </div>
      </main>
    </div>
  );
};


// --- Sub Components for Teacher Dashboard ---

const StudentManagementView = ({ students, fetchStudents, teacher }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({ name: '', rollNumber: '', classId: '', mobile: '', email: '', password: '' });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await supabaseDB.createStudent({
        ...formData,
        teacherId: teacher.id,
        batch: teacher.batchType
      });
      toast.success("Student created successfully!");
      setShowAdd(false);
      setFormData({ name: '', rollNumber: '', classId: '', mobile: '', email: '', password: '' });
      fetchStudents();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brandNavy">My Students</h1>
          <p className="text-textMuted mt-1">Manage your batch students.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-5 py-2.5 bg-brandBlue hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all">
          <UserPlus size={20} />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-4 px-6 font-semibold text-textMuted text-sm">Roll No</th>
              <th className="py-4 px-6 font-semibold text-textMuted text-sm">Name</th>
              <th className="py-4 px-6 font-semibold text-textMuted text-sm">Class</th>
              <th className="py-4 px-6 font-semibold text-textMuted text-sm">Login ID</th>
              <th className="py-4 px-6 font-semibold text-textMuted text-sm">Batch</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.length === 0 ? (
              <tr><td colSpan="5" className="py-8 text-center text-textMuted">No students in your batch yet.</td></tr>
            ) : (
              students.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-brandNavy">{s.rollNumber}</td>
                  <td className="py-4 px-6">{s.name}</td>
                  <td className="py-4 px-6">{s.classId}</td>
                  <td className="py-4 px-6 text-sm">{s.id.split('_')[1]}@st.com</td>
                  <td className="py-4 px-6 text-xs font-semibold text-brandBlue">{s.batch}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
             <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-bold text-brandNavy">Create Student Account</h2>
              <button onClick={() => setShowAdd(false)} className="text-gray-400"><X size={24}/></button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
               <div><label className="block text-sm font-medium mb-1">Name</label><input required className="w-full px-3 py-2 border rounded-lg" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})}/></div>
               <div className="grid grid-cols-2 gap-4">
                 <div><label className="block text-sm font-medium mb-1">Roll No</label><input required className="w-full px-3 py-2 border rounded-lg" value={formData.rollNumber} onChange={e=>setFormData({...formData, rollNumber: e.target.value})}/></div>
                 <div><label className="block text-sm font-medium mb-1">Class</label><input required className="w-full px-3 py-2 border rounded-lg" value={formData.classId} onChange={e=>setFormData({...formData, classId: e.target.value})}/></div>
               </div>
               <div><label className="block text-sm font-medium mb-1">Parent Mobile</label><input required type="tel" className="w-full px-3 py-2 border rounded-lg" value={formData.mobile} onChange={e=>setFormData({...formData, mobile: e.target.value})}/></div>
               
               <div className="pt-4 border-t border-gray-100"><h3 className="font-bold mb-2">Login Credentials</h3></div>
               <div><label className="block text-sm font-medium mb-1">Student Email / ID</label><input required type="email" className="w-full px-3 py-2 border rounded-lg" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})}/></div>
               <div><label className="block text-sm font-medium mb-1">Password</label><input required type="text" className="w-full px-3 py-2 border rounded-lg" value={formData.password} onChange={e=>setFormData({...formData, password: e.target.value})}/></div>
               
               <div className="mt-8 flex justify-end gap-3 pt-4"><button type="submit" className="px-6 py-2 bg-brandBlue text-white rounded-lg font-bold">Add Student</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AttendanceView = ({students, teacher}) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    // initialize all to present
    const initData = {};
    students.forEach(s => initData[s.id] = 'present');
    setAttendanceData(initData);
  }, [students, date]);

  const toggleStatus = (id) => {
    setAttendanceData(prev => ({...prev, [id]: prev[id] === 'present' ? 'absent' : 'present'}));
  };

  const handleSave = async () => {
    try {
      const records = Object.keys(attendanceData).map(id => ({ studentId: id, status: attendanceData[id] }));
      await supabaseDB.markAttendance(date, teacher.batchType, records, teacher.id);
      toast.success("Attendance marked securely");
    } catch(e) {
      toast.error(e.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brandNavy">Daily Attendance</h1>
        </div>
        <div className="flex items-center gap-4">
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg text-brandNavy font-semibold" />
          <button onClick={handleSave} className="px-5 py-2.5 bg-brandBlue text-white rounded-lg font-semibold">Save Attendance</button>
        </div>
      </div>

       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-sm">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-gray-50 border-b border-gray-100"><th className="py-4 px-6">Roll No</th><th className="py-4 px-6">Name</th><th className="py-4 px-6 text-center">Status</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {students.map(s => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="py-3 px-6 font-bold">{s.rollNumber}</td>
                <td className="py-3 px-6">{s.name}</td>
                <td className="py-3 px-6 flex justify-center">
                   <button onClick={() => toggleStatus(s.id)} className={`w-24 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors ${attendanceData[s.id] === 'present' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                      {attendanceData[s.id] || 'present'}
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
    </div>
  );
};

const MarksView = ({students, teacher}) => {
  const [date, setDate] = useState('');
  const [marks, setMarks] = useState({});

  const handleSave = async (e) => {
    e.preventDefault();
    if(!date) return toast.error("Select a date");
    try {
      const records = Object.keys(marks).map(id => ({ studentId: id, mark: marks[id] }));
      await supabaseDB.uploadMarks(date, teacher.batchType, teacher.subject, records, teacher.id);
      toast.success("Marks uploaded successfully");
    } catch(e) {
      toast.error(e.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-brandNavy mb-8">Test Marks Upload</h1>
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
         <div className="flex gap-4 mb-6"><input type="date" value={date} onChange={e=>setDate(e.target.value)} required className="px-4 py-2 border rounded-lg" /> <div className="px-4 py-2 bg-gray-100 rounded-lg text-brandNavy font-semibold">Subject: {teacher.subject}</div></div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-auto mb-6 pr-4">
            {students.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-brandBlue transition-colors">
                <div><p className="font-bold text-brandNavy text-sm">{s.name}</p><p className="text-xs text-textMuted">Roll: {s.rollNumber}</p></div>
                <input type="number" placeholder="Marks" required max="100" min="0" value={marks[s.id] || ''} onChange={e=>setMarks({...marks, [s.id]: e.target.value})} className="w-20 px-3 py-2 text-center border rounded-lg focus:border-brandBlue focus:ring-1 focus:ring-brandBlue outline-none" />
              </div>
            ))}
         </div>
         <button type="submit" className="w-full py-3 bg-brandNavy text-white rounded-xl font-bold hover:bg-brandBlue transition-colors">Publish Marks</button>
      </form>
    </div>
  );
};

const RemarksView = ({students, teacher}) => {
  const [studentId, setStudentId] = useState('');
  const [type, setType] = useState('performance');
  const [content, setContent] = useState('');

  const submitRemark = async (e) => {
    e.preventDefault();
    if(!studentId) return toast.error("Select student");
    try {
      await supabaseDB.addRemark(studentId, `Teacher Remark (${type})`, content, type, teacher.id);
      toast.success("Remark sent to student!");
      setContent('');
    } catch(e){ toast.error(e.message); }
  }

  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight text-brandNavy mb-8">Student Remarks</h1>
        <div className="max-w-2xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <form onSubmit={submitRemark} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Select Student</label>
                <select value={studentId} onChange={e=>setStudentId(e.target.value)} required className="w-full p-2 border rounded-lg">
                  <option value="" disabled>--- Select Student ---</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.rollNumber})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Remark Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2"><input type="radio" name="type" checked={type==='performance'} onChange={()=>setType('performance')}/> Performance</label>
                  <label className="flex items-center gap-2"><input type="radio" name="type" checked={type==='behavior'} onChange={()=>setType('behavior')}/> Behavior</label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Feedback Message</label>
                <textarea required rows="4" value={content} onChange={e=>setContent(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Write a detailed remark..."></textarea>
              </div>
              <button type="submit" className="px-6 py-2 bg-brandBlue text-white rounded-lg font-bold">Submit Remark</button>
           </form>
        </div>
    </div>
  )
}

export default TeacherDashboard;
