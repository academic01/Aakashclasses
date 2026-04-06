import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabaseDB } from '../../lib/supabaseDB';
import { LogOut, Users, UserPlus, CheckSquare, FileSpreadsheet, MessageSquare, Menu, X, BookOpenCheck, Milestone } from 'lucide-react';
import toast from 'react-hot-toast';

const TeacherDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [view, setView] = useState('overview'); // overview, attendance, marks, remarks, doubts
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Check for profile completeness
  useEffect(() => {
    if (currentUser && (!currentUser.subject || !currentUser.batch_type)) {
      setShowProfileModal(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.id) {
      fetchStudents();
    }
  }, [currentUser]);

  const fetchStudents = async () => {
    try {
      const data = await supabaseDB.getStudentsByTeacher(currentUser.id, currentUser.batch_type);
      setStudents(data);
    } catch (err) {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const SidebarBtn = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${view === id ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-exo text-textPrimary">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0D2240] text-white transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
                    <BookOpenCheck size={18} className="text-white" />
                </div>
                <span className="text-xl font-orbitron font-bold">Faculty<span className="text-teal-400">Portal</span></span>
            </div>
            <button className="lg:hidden text-gray-300" onClick={() => setSidebarOpen(false)}><X size={24}/></button>
          </div>
          
          <div className="flex items-center gap-3 mb-8 p-3 bg-white/5 border border-white/10 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xl ring-2 ring-white/10">
              {currentUser?.name?.charAt(0) || 'T'}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm leading-tight truncate">{currentUser?.name}</p>
              <p className="text-[10px] text-teal-400 font-black uppercase tracking-widest mt-1">{currentUser?.subject || 'Updating...'}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <SidebarBtn id="overview" icon={Users} label="My Batch" />
            <SidebarBtn id="attendance" icon={CheckSquare} label="Attendance" />
            <SidebarBtn id="marks" icon={FileSpreadsheet} label="Weekly Test" />
            <SidebarBtn id="doubts" icon={MessageSquare} label="Student Doubts" />
          </nav>

          <button onClick={logout} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg font-semibold transition-all">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-brandNavy">
            <Menu size={24} />
          </button>
          <span className="font-orbitron font-bold text-brandNavy text-xl">Faculty<span className="text-teal-500">Portal</span></span>
          <div className="w-6 hidden"></div>
        </header>

        <div className="flex-1 overflow-auto p-6 lg:p-10">
          
          {view === 'overview' && (
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

          {view === 'doubts' && (
             <DoubtManagementView teacher={currentUser} />
          )}

        </div>
      </main>

      {/* Complete Profile Modal */}
      {showProfileModal && <ProfileSetupModal user={currentUser} onClose={() => setShowProfileModal(false)} />}
    </div>
  );
};

const ProfileSetupModal = ({ user, onClose }) => {
    const [subj, setSubj] = useState('');
    const [batch, setBatch] = useState('Full Week');
    
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await supabaseDB.updateProfile(user.id, { 
                subject: subj, 
                batch_type: batch 
            });
            toast.success("Profile initialized! Welcome to the portal.");
            onClose();
            window.location.reload(); // Refresh to update context
        } catch (err) {
            toast.error("Failed to save profile");
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-teal-900/40 backdrop-blur-md">
            <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl border border-teal-100 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Aakash Faculty</h2>
                <p className="text-gray-500 text-sm mb-8">Please initialize your teaching profile to continue.</p>
                
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Primary Subject</label>
                        <select 
                            value={subj} 
                            onChange={e => setSubj(e.target.value)} 
                            required 
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-teal-500 focus:outline-none focus:ring-0 text-gray-800 font-bold"
                        >
                            <option value="">Select Subject</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Biology">Biology</option>
                            <option value="SST">SST</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Batch Assignment</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['MWF', 'TTS', 'Full Week'].map(b => (
                                <button 
                                    key={b} 
                                    type="button" 
                                    onClick={() => setBatch(b)}
                                    className={`py-3 rounded-2xl font-bold text-xs transition-all ${batch === b ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    {b}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-teal-600/20 active:scale-95">Complete Setup</button>
                </form>
            </div>
        </div>
    );
};

const DoubtManagementView = ({ teacher }) => {
    const [doubts, setDoubts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyTo, setReplyTo] = useState(null);
    const [ans, setAns] = useState('');

    useEffect(() => {
        fetchDoubts();
    }, []);

    const fetchDoubts = async () => {
        try {
            const data = await supabaseDB.getDoubtsByTeacher(teacher.id);
            setDoubts(data);
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async () => {
        try {
            await supabaseDB.resolveDoubt(replyTo.id, ans);
            toast.success("Doubt resolved!");
            setReplyTo(null);
            setAns('');
            fetchDoubts();
        } catch (err) {
            toast.error("Failed to submit reply");
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Pending Student Doubts</h1>
            <div className="space-y-4">
                {doubts.map(d => (
                    <div key={d.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${d.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{d.status}</span>
                                <span className="text-xs text-gray-400">Asked by {d.profiles.name} • {new Date(d.created_at).toLocaleDateString()}</span>
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">{d.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2">{d.content}</p>
                            {d.answer && <div className="mt-4 p-4 bg-teal-50 rounded-xl border border-teal-100 text-teal-800 text-sm"><span className="font-black uppercase text-[10px] block mb-1">Your Answer:</span>{d.answer}</div>}
                        </div>
                        {d.status === 'pending' && <button onClick={() => setReplyTo(d)} className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-teal-600/10">Reply</button>}
                    </div>
                ))}
            </div>

            {replyTo && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[32px] p-8 w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">Answering Doubt</h2>
                        <div className="mb-6 p-4 bg-gray-50 rounded-2xl text-gray-600 text-sm">"{replyTo.content}"</div>
                        <textarea value={ans} onChange={e=>setAns(e.target.value)} rows="5" className="w-full p-4 bg-gray-50 border-2 rounded-2xl mb-6" placeholder="Write your detailed explanation here..."></textarea>
                        <div className="flex justify-end gap-3"><button onClick={() => setReplyTo(null)} className="px-6 py-2 rounded-xl bg-gray-100 text-gray-500 font-bold">Cancel</button><button onClick={handleResolve} className="px-6 py-2 rounded-xl bg-teal-600 text-white font-bold">Submit Answer</button></div>
                    </div>
                </div>
            )}
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
        batch: teacher.batch_type
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
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">My Batch</h1>
          <p className="text-gray-500 font-medium tracking-tight">Active students in your {teacher.batch_type} session.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-teal-100 transition-all active:scale-95">
          <UserPlus size={20} />
          Enroll Student
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.length === 0 ? (
            <div className="col-span-full py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
                <Users size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-400 font-orbitron font-bold uppercase tracking-widest">No Students Enrolled</p>
            </div>
        ) : (
            students.map(s => (
                <div key={s.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 font-black text-xl">
                            {s.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 truncate w-40">{s.name}</h3>
                            <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Roll: {s.roll_number}</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase">Class:</span><span className="text-gray-900 font-black">{s.class_id}</span></div>
                        <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase">Mobile:</span><span className="text-gray-900 font-black">{s.mobile}</span></div>
                        <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase">Portal ID:</span><span className="text-teal-600 font-black">{s.email}</span></div>
                    </div>
                </div>
            ))
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-teal-900/40 backdrop-blur-md">
          <div className="bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl animate-fade-in-up">
             <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-orbitron font-bold">Enroll <span className="text-teal-600">Student</span></h2>
              <button onClick={() => setShowAdd(false)} className="text-gray-400"><X size={24}/></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
                <input required placeholder="Student Name" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})}/>
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Roll Number" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" value={formData.rollNumber} onChange={e=>setFormData({...formData, rollNumber: e.target.value})}/>
                  <input required placeholder="Class (e.g. 10th)" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" value={formData.classId} onChange={e=>setFormData({...formData, classId: e.target.value})}/>
                </div>
                <input required type="tel" placeholder="Parent Mobile" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" value={formData.mobile} onChange={e=>setFormData({...formData, mobile: e.target.value})}/>
                <div className="pt-4 border-t border-gray-100"><p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Portal Credentials</p></div>
                <input required type="email" placeholder="Login Email" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})}/>
                <input required type="text" placeholder="Access Password" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" value={formData.password} onChange={e=>setFormData({...formData, password: e.target.value})}/>
                <button type="submit" className="w-full py-5 bg-teal-600 text-white rounded-3xl font-bold shadow-xl shadow-teal-200 mt-4">Generate Student Account</button>
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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const initData = {};
    students.forEach(s => initData[s.id] = 'present');
    setAttendanceData(initData);
  }, [students, date]);

  const toggleStatus = (id) => {
    setAttendanceData(prev => ({...prev, [id]: prev[id] === 'present' ? 'absent' : 'present'}));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const records = Object.keys(attendanceData).map(id => ({ studentId: id, status: attendanceData[id] }));
      await supabaseDB.markAttendance(date, teacher.batch_type, records, teacher.id);
      toast.success("Attendance synced for " + teacher.batch_type);
    } catch(e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Attendance</h1>
          <p className="text-gray-500 font-medium">Daily attendance for {teacher.batch_type} batch.</p>
        </div>
        <div className="flex items-center gap-4">
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-gray-900 shadow-sm" />
          <button onClick={handleSave} disabled={saving} className="px-8 py-3 bg-teal-600 text-white rounded-2xl font-bold shadow-xl shadow-teal-100 disabled:opacity-50">
            {saving ? 'Saving...' : 'Sync Logs'}
          </button>
        </div>
      </div>

       <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead><tr className="bg-gray-50 border-b border-gray-100"><th className="py-6 px-10 font-black text-gray-400 text-[10px] uppercase tracking-widest">Student</th><th className="py-6 px-10 font-black text-gray-400 text-[10px] uppercase tracking-widest text-center">Marking</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {students.map(s => (
              <tr key={s.id} className="hover:bg-teal-50/10 transition-colors">
                <td className="py-6 px-10">
                    <p className="font-bold text-gray-900">{s.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Roll: {s.roll_number}</p>
                </td>
                <td className="py-6 px-10 flex justify-center">
                   <button onClick={() => toggleStatus(s.id)} className={`w-32 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[2px] transition-all border-2 ${attendanceData[s.id] === 'present' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                      {attendanceData[s.id]}
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
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [marks, setMarks] = useState({});
  const [publishing, setPublishing] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setPublishing(true);
    try {
      const records = Object.keys(marks).map(id => ({ studentId: id, mark: marks[id] }));
      await supabaseDB.uploadMarks(date, teacher.batch_type, teacher.subject, records, teacher.id);
      toast.success("Marks published to " + teacher.batch_type);
    } catch(e) {
      toast.error(e.message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Weekly Test Results</h1>
      <p className="text-gray-500 font-medium mb-12">Publish marks for {teacher.subject} in {teacher.batch_type} batch.</p>

      <form onSubmit={handleSave} className="space-y-8">
         <div className="flex flex-col md:flex-row gap-4">
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} required className="px-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold shadow-sm" /> 
            <div className="px-8 py-4 bg-teal-50 rounded-2xl text-teal-700 font-black uppercase tracking-widest flex items-center gap-3">
                <BookOpenCheck size={20} />
                {teacher.subject} Assessment
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-auto pr-2 custom-scrollbar">
            {students.map(s => (
              <div key={s.id} className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center justify-between group hover:border-teal-200 transition-all">
                <div className="overflow-hidden">
                    <p className="font-bold text-gray-900 truncate w-32">{s.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Roll: {s.roll_number}</p>
                </div>
                <div className="relative">
                    <input type="number" placeholder="00" required max="100" min="0" value={marks[s.id] || ''} onChange={e=>setMarks({...marks, [s.id]: e.target.value})} className="w-20 px-4 py-4 text-center bg-gray-50 border-2 border-transparent focus:border-teal-500 rounded-2xl outline-none font-black text-xl text-teal-600 transition-all" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center text-[10px] font-black text-gray-300">/100</span>
                </div>
              </div>
            ))}
         </div>
         <button type="submit" disabled={publishing} className="w-full py-6 bg-teal-900 text-white rounded-[32px] font-black uppercase tracking-[2px] hover:bg-[#0D2240] transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98]">
            {publishing ? 'Publishing Marks...' : 'Finalize & Publish Scores'}
         </button>
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
      await supabaseDB.addRemark(studentId, `Faculty Report (${type})`, content, type, teacher.id);
      toast.success("Remark transmitted!");
      setContent('');
    } catch(e){ toast.error(e.message); }
  }

  return (
    <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Student Feedback</h1>
        <p className="text-gray-500 font-medium mb-10">Send specialized remarks directly to parents and students.</p>

        <div className="bg-white p-10 rounded-[48px] shadow-sm border border-gray-100">
           <form onSubmit={submitRemark} className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-3">Select Student</label>
                <select value={studentId} onChange={e=>setStudentId(e.target.value)} required className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold text-gray-900 border-2 border-transparent focus:border-indigo-100 appearance-none">
                  <option value="" disabled>Search Batch Student</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name} (Roll: {s.roll_number})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-4">Report Type</label>
                <div className="grid grid-cols-2 gap-4">
                    {['performance', 'behavior'].map(t => (
                        <button 
                            key={t}
                            type="button"
                            onClick={() => setType(t)}
                            className={`py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all border-2 ${type === t ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-400 border-gray-100'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-3">Feedback Message</label>
                <textarea required rows="5" value={content} onChange={e=>setContent(e.target.value)} className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-medium text-gray-700 focus:border-indigo-100 border-2 border-transparent" placeholder="Describe the student's progress or observations..."></textarea>
              </div>
              <button type="submit" className="w-full py-5 bg-teal-600 text-white rounded-[24px] font-bold shadow-xl shadow-teal-100">Transmit Report</button>
           </form>
        </div>
    </div>
  )
}

export default TeacherDashboard;

