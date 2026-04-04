import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabaseDB } from '../../lib/supabaseDB';
import { LogOut, Calendar, Milestone, MessageSquare, LayoutDashboard, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [view, setView] = useState('overview'); // overview, attendance, marks, remarks
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [remarks, setRemarks] = useState([]);
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
      const [attData, marksData, remarksData] = await Promise.all([
        supabaseDB.getAttendanceForStudent(currentUser.id),
        supabaseDB.getMarksForStudent(currentUser.id),
        supabaseDB.getRemarksForStudent(currentUser.id)
      ]);
      setAttendance(attData);
      setMarks(marksData);
      setRemarks(remarksData);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
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
            <span className="text-2xl font-orbitron font-bold">Student<span className="text-brandBlue">Portal</span></span>
            <button className="lg:hidden text-gray-300" onClick={() => setSidebarOpen(false)}><X size={24}/></button>
          </div>
          
          <div className="flex items-center gap-3 mb-8 p-3 bg-white/10 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
              {currentUser?.name?.charAt(0) || 'S'}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">{currentUser?.name || 'User'}</p>
              <p className="text-xs text-gray-300">ID: {currentUser?.id?.toString().substring(0, 8)}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <SidebarBtn id="overview" icon={LayoutDashboard} label="Overview" />
            <SidebarBtn id="attendance" icon={Calendar} label="Attendance" />
            <SidebarBtn id="marks" icon={Milestone} label="Test Results" />
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
          <span className="font-orbitron font-bold text-brandNavy text-xl">Student<span className="text-brandBlue">Portal</span></span>
          <div className="w-6 hidden"></div>
        </header>

        <div className="flex-1 overflow-auto p-6 lg:p-10">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-brandNavy border-t-brandBlue rounded-full animate-spin"></div>
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
              {view === 'remarks' && (
                <StudentRemarks remarks={remarks} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

// --- Sub Components ---

const StudentOverview = ({ attendance, marks, remarks }) => {
  const presentCount = attendance.filter(a => a.status === 'present').length;
  const attendanceRate = attendance.length > 0 ? (presentCount / attendance.length * 100).toFixed(1) : 0;
  
  const latestMark = marks.length > 0 ? marks[0].mark : 'N/A';
  const latestRemark = remarks.length > 0 ? remarks[0].content : 'No remarks yet.';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brandNavy">Dashboard Overview</h1>
        <p className="text-textMuted mt-1">Check your performance at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-brandBlue">
              <Calendar size={20} />
            </div>
            <h3 className="font-bold text-textPrimary">Attendance</h3>
          </div>
          <p className="text-3xl font-bold text-brandNavy">{attendanceRate}%</p>
          <p className="text-sm text-textMuted mt-1">{presentCount} of {attendance.length} days present</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <Milestone size={20} />
            </div>
            <h3 className="font-bold text-textPrimary">Latest Score</h3>
          </div>
          <p className="text-3xl font-bold text-brandNavy">{latestMark}</p>
          <p className="text-sm text-textMuted mt-1">From most recent test</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <MessageSquare size={20} />
            </div>
            <h3 className="font-bold text-textPrimary">Recent Feedback</h3>
          </div>
          <p className="text-sm text-textMuted line-clamp-2">{latestRemark}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-brandNavy mb-4">Recent Marks</h3>
          <div className="space-y-4">
            {marks.slice(0, 5).map((m, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-bold text-sm text-brandNavy">{m.subject}</p>
                  <p className="text-xs text-textMuted">{m.date}</p>
                </div>
                <span className="font-bold text-brandBlue">{m.mark}</span>
              </div>
            ))}
            {marks.length === 0 && <p className="text-textMuted text-sm text-center py-4">No test marks available yet.</p>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-brandNavy mb-4">Recent Remarks</h3>
          <div className="space-y-4">
            {remarks.slice(0, 5).map((r, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-brandBlue">{r.type}</p>
                  <p className="text-[10px] text-textMuted">{new Date(r.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-textPrimary italic">"{r.content}"</p>
              </div>
            ))}
            {remarks.length === 0 && <p className="text-textMuted text-sm text-center py-4">No remarks available yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentAttendance = ({ attendance }) => (
  <div>
    <h1 className="text-3xl font-bold tracking-tight text-brandNavy mb-8">My Attendance</h1>
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="py-4 px-6 font-semibold text-textMuted text-sm">Date</th>
            <th className="py-4 px-6 font-semibold text-textMuted text-sm text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {attendance.length === 0 ? (
            <tr><td colSpan="2" className="py-8 text-center text-textMuted">No attendance records found.</td></tr>
          ) : (
            attendance.map((a, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="py-3 px-6">{a.date}</td>
                <td className="py-3 px-6 flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${a.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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
  <div>
    <h1 className="text-3xl font-bold tracking-tight text-brandNavy mb-8">Test Results</h1>
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="py-4 px-6 font-semibold text-textMuted text-sm">Date</th>
            <th className="py-4 px-6 font-semibold text-textMuted text-sm">Subject</th>
            <th className="py-4 px-6 font-semibold text-textMuted text-sm text-center">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {marks.length === 0 ? (
            <tr><td colSpan="3" className="py-8 text-center text-textMuted">No test results found.</td></tr>
          ) : (
            marks.map((m, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="py-3 px-6">{m.date}</td>
                <td className="py-3 px-6 font-medium">{m.subject}</td>
                <td className="py-3 px-6 text-center font-bold text-brandBlue">{m.mark}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const StudentRemarks = ({ remarks }) => (
  <div>
    <h1 className="text-3xl font-bold tracking-tight text-brandNavy mb-8">Teacher Remarks</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {remarks.length === 0 ? (
        <p className="text-textMuted bg-white p-8 rounded-2xl border border-gray-100 text-center col-span-2">No remarks received yet.</p>
      ) : (
        remarks.map((r, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${r.type === 'performance' ? 'bg-brandBlue' : 'bg-purple-500'}`}></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-brandNavy">{r.title}</h3>
                <p className="text-xs text-textMuted">{new Date(r.date).toLocaleDateString()}</p>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${r.type === 'performance' ? 'bg-blue-50 text-brandBlue' : 'bg-purple-50 text-purple-600'}`}>
                {r.type}
              </span>
            </div>
            <p className="text-textPrimary italic">"{r.content}"</p>
          </div>
        ))
      )}
    </div>
  </div>
);

export default StudentDashboard;
