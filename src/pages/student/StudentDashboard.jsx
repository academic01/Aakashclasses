import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabaseDB } from '../../lib/supabaseDB';
import { LogOut, Calendar, Milestone, MessageSquare, LayoutDashboard, Menu, X, Activity, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [view, setView] = useState('overview'); // overview, attendance, marks, doubts
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (currentUser?.id) {
      fetchStudentData();
    }
  }, [currentUser]);

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const [attData, marksData, remarksData, doubtsData] = await Promise.all([
        supabaseDB.getAttendanceForStudent(currentUser.id),
        supabaseDB.getMarksForStudent(currentUser.id),
        supabaseDB.getRemarksForStudent(currentUser.id),
        supabaseDB.getDoubtsByStudent(currentUser.id)
      ]);
      setAttendance(attData);
      setMarks(marksData);
      setRemarks(remarksData);
      setDoubts(doubtsData);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const SidebarBtn = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${view === id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex font-exo text-textPrimary">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-100 transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                    <GraduationCap size={24} className="text-white" />
                </div>
                <span className="text-xl font-orbitron font-bold text-gray-900">Student<span className="text-indigo-600">Hub</span></span>
             </div>
            <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}><X size={24}/></button>
          </div>
          
          <div className="flex flex-col items-center text-center mb-10 p-6 bg-indigo-50 rounded-[32px] border border-indigo-100/50">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold text-3xl shadow-sm mb-4 ring-4 ring-white">
              {currentUser?.name?.charAt(0) || 'S'}
            </div>
            <div className="w-full text-center">
              <p className="font-bold text-gray-900 leading-tight truncate px-2">{currentUser?.name || 'User'}</p>
              <p className="text-[10px] font-black uppercase tracking-[2px] text-indigo-400 mt-2">Roll: {currentUser?.roll_number || 'N/A'}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-3">
            <SidebarBtn id="overview" icon={LayoutDashboard} label="Performance" />
            <SidebarBtn id="attendance" icon={Calendar} label="Attendance" />
            <SidebarBtn id="marks" icon={Milestone} label="Test History" />
            <SidebarBtn id="doubts" icon={MessageSquare} label="Doubt Center" />
          </nav>

          <button onClick={logout} className="mt-auto flex items-center gap-3 px-6 py-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-all">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-indigo-600">
            <Menu size={24} />
          </button>
          <span className="font-orbitron font-bold text-gray-900 text-xl">Student<span className="text-indigo-600">Hub</span></span>
          <div className="w-6 hidden"></div>
        </header>

        <div className="flex-1 overflow-auto p-6 lg:p-12">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {view === 'overview' && (
                <StudentOverview attendance={attendance} marks={marks} remarks={remarks} />
              )}
              {view === 'attendance' && (
                <StudentAttendance attendance={attendance} />
              )}
              {view === 'marks' && (
                <StudentMarks marks={marks} />
              )}
              {view === 'doubts' && (
                <StudentDoubts doubts={doubts} fetchDoubts={fetchStudentData} studentId={currentUser.id} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

// --- Parent-Facing Overview ---

const StudentOverview = ({ attendance, marks, remarks }) => {
  const presentCount = attendance.filter(a => a.status === 'present').length;
  const attendanceRate = attendance.length > 0 ? (presentCount / attendance.length * 100).toFixed(1) : 0;
  
  const scores = marks.map(m => parseFloat(m.mark)).filter(s => !isNaN(s));
  const avgScore = scores.length > 0 ? (scores.reduce((a,b) => a+b, 0) / scores.length).toFixed(1) : 0;

  const recentMarks = [...marks].reverse().slice(-5);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Academic Overview</h1>
          <p className="text-gray-500 font-medium tracking-tight">Vitals and progress logs for parents and students.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100">
           <p className="text-xs font-black uppercase tracking-[2px] text-gray-400 mb-6 text-center">Attendance Log</p>
           <p className="text-5xl font-black text-gray-900 text-center">{attendanceRate}%</p>
           <p className="text-xs text-gray-400 text-center mt-2 uppercase font-bold">{presentCount} Days Present</p>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-100">
           <p className="text-xs font-black uppercase tracking-[2px] text-gray-400 mb-6 text-center">Avg. Score</p>
           <p className="text-5xl font-black text-gray-900 text-center">{avgScore}</p>
           <p className="text-xs text-gray-400 text-center mt-2 uppercase font-bold">Standard Performance</p>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-100">
           <p className="text-xs font-black uppercase tracking-[2px] text-gray-400 mb-6 text-center">Latest Feedback</p>
           <p className="text-sm text-gray-600 font-bold italic line-clamp-3 text-center">
                {remarks.length > 0 ? `"${remarks[0].content}"` : "Awaiting educator feedback"}
           </p>
        </div>
      </div>

      {/* Progress Graph (Pure CSS/SVG) */}
      <div className="bg-white p-10 rounded-[48px] border border-gray-100">
        <h3 className="text-2xl font-orbitron font-bold text-gray-900 mb-12">Weekly Test <span className="text-indigo-600">Growth</span></h3>
        {recentMarks.length > 0 ? (
            <div className="h-[250px] flex items-end justify-around gap-6 px-10 border-b border-gray-100 pb-2">
                {recentMarks.map((m, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                        <div className="w-full max-w-[60px] bg-gradient-to-t from-indigo-700 to-indigo-400 rounded-t-2xl transition-all duration-500 hover:scale-[1.05]" style={{ height: `${m.mark}%` }} />
                        <p className="absolute -bottom-8 text-[9px] font-black text-gray-400 uppercase tracking-widest">{m.subject}</p>
                        <p className="absolute bottom-2 text-white font-black text-xs">{m.mark}</p>
                    </div>
                ))}
            </div>
        ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest">Awaiting First Test Results</div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 overflow-hidden">
             <h3 className="text-xl font-orbitron font-bold mb-8">Score <span className="text-indigo-600">Feed</span></h3>
             <div className="space-y-4">
                {marks.slice(0, 4).map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 bg-[#FDFDFF] rounded-[24px] border border-gray-50">
                        <div>
                            <p className="font-bold text-gray-900">{m.subject}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(m.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-2xl font-black text-[#0D2240]">{m.mark}</p>
                    </div>
                ))}
             </div>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-gray-100">
             <h3 className="text-xl font-orbitron font-bold mb-8">Admin <span className="text-indigo-600">Remarks</span></h3>
             <div className="space-y-4">
                {remarks.slice(0, 3).map((r, idx) => (
                    <div key={idx} className="p-6 bg-indigo-50/50 rounded-[30px] border border-indigo-100/30">
                        <p className="text-gray-600 font-bold italic text-sm">"{r.content}"</p>
                        <p className="text-[9px] text-indigo-400 font-black uppercase mt-3">— {r.type}</p>
                    </div>
                ))}
             </div>
          </div>
      </div>
    </div>
  );
};

const StudentAttendance = ({ attendance }) => (
  <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-10">Attendance History</h1>
    <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="py-6 px-10 font-black text-gray-400 text-[10px] uppercase tracking-widest">Date Reported</th>
            <th className="py-6 px-10 font-black text-gray-400 text-[10px] uppercase tracking-widest text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {attendance.length === 0 ? (
            <tr><td colSpan="2" className="py-20 text-center text-gray-300 uppercase font-black tracking-widest">No Logs Available</td></tr>
          ) : (
            attendance.map((a, idx) => (
              <tr key={idx} className="hover:bg-indigo-50/20">
                <td className="py-6 px-10 text-gray-700 font-bold">{new Date(a.date).toLocaleDateString()}</td>
                <td className="py-6 px-10 flex justify-center">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${a.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const StudentMarks = ({ marks }) => (
  <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-10">Academic Records</h1>
    <div className="grid grid-cols-1 gap-4">
        {marks.map((m, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[40px] border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black uppercase text-xl">
                        {m.subject?.substring(0, 2)}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{m.subject}</h3>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{new Date(m.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-4xl font-black text-indigo-600">{m.mark}</p>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Total: 100</p>
                </div>
            </div>
        ))}
    </div>
  </div>
);

const StudentDoubts = ({ doubts, fetchDoubts, studentId }) => {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await supabaseDB.submitDoubt(studentId, title, content);
            toast.success("Doubt pushed! Faculty will respond shortly.");
            setTitle(''); setContent(''); setShowForm(false);
            fetchDoubts();
        } catch (err) {
            toast.error("Submit failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Doubt Center</h1>
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold transition-all active:scale-95 flex items-center gap-2"
                >
                    <MessageSquare size={18} />
                    Push Doubt
                </button>
            </div>

            <div className="space-y-6">
                {doubts.map(d => (
                    <div key={d.id} className="bg-white p-8 rounded-[40px] border border-gray-50 text-left">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${d.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{d.status}</span>
                            <span className="text-[10px] text-gray-400 font-bold">{new Date(d.created_at).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{d.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">{d.content}</p>
                        
                        {d.status === 'resolved' && (
                            <div className="w-full p-6 bg-indigo-50/50 rounded-[32px] border border-indigo-100/50">
                                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 block mb-2">Teacher Reply</span>
                                <p className="text-gray-900 font-serif text-sm italic">"{d.answer}"</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
                    <div className="bg-white rounded-[40px] p-10 w-full max-w-lg shadow-2xl animate-fade-in-up">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-orbitron font-bold">New <span className="text-indigo-600">Doubt</span></h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-400"><X size={24}/></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Topic (e.g. Mechanics)" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" />
                            <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Explain clearly..." rows="5" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none" />
                            <button type="submit" disabled={submitting} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100">
                                {submitting ? 'Pushing...' : 'Push to Faculty'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
