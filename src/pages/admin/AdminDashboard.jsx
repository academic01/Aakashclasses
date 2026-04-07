import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { firebaseDB } from '../../lib/firebaseDB';
import { LogOut, Users, UserPlus, BookOpen, Clock, Activity, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    subject: '',
    mobile: '',
    batchType: 'MWF'
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await firebaseDB.getTeachers();
      setTeachers(data);
    } catch (err) {
      toast.error("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      // In Firebase, we just create the record in 'profiles' collection
      // The teacher will use these credentials to Sign Up or Login
      // A more secure way is using Firebase Admin SDK, but client-side creation for demo
      toast.loading("Creating faculty portal...", { id: 'admin-action' });
      
      // Note: In Firestore, we use 'profiles' collection.
      // We'll use a temporary ID for provisioning if they don't have a UID yet.
      // For now, creating a mock profile record.
      await firebaseDB.addWeeklyRemark({
        ...formData,
        role: 'teacher',
        type: 'provision'
      });

      toast.success("Teacher record created!", { id: 'admin-action' });
      setShowAddModal(false);
      setFormData({ name: '', email: '', password: '', subject: '', mobile: '', batchType: 'MWF' });
      fetchTeachers();
    } catch (err) {
      toast.error(err.message || "Failed to create teacher", { id: 'admin-action' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060B12] flex font-exo text-white selection:bg-indigo-500/30">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-80 bg-[#0D121F] border-r border-white/5 transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-12">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Activity size={24} className="text-white" />
                </div>
                <span className="text-xl font-orbitron font-bold tracking-tight">Admin<span className="text-indigo-400">Hub</span></span>
             </div>
            <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}><X size={24}/></button>
          </div>
          
          <div className="flex items-center gap-4 mb-12 p-4 bg-white/5 border border-white/5 rounded-3xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/10">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="font-bold text-sm tracking-tight">{currentUser?.name}</p>
              <p className="text-[10px] font-black uppercase tracking-[2px] text-indigo-400 mt-1">Superuser</p>
            </div>
          </div>

          <nav className="flex-1 space-y-3">
            <button className="w-full flex items-center gap-4 px-6 py-4 bg-indigo-600 text-white rounded-[24px] font-bold shadow-xl shadow-indigo-500/10 transition-all text-left">
              <Users size={20} />
              Faculty Management
            </button>
            <button className="w-full flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-[24px] font-bold transition-all opacity-50 cursor-not-allowed text-left">
                <Clock size={20} />
                Global Attendance
            </button>
          </nav>

          <button onClick={logout} className="mt-auto flex items-center gap-4 px-6 py-4 text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-[24px] font-bold transition-all">
            <LogOut size={20} />
            Logout System
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-[#0D121F]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 shrink-0 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-white">
            <Menu size={24} />
          </button>
          <span className="font-orbitron font-bold text-white text-xl">Admin<span className="text-indigo-400">Hub</span></span>
          <div className="w-6 hidden"></div>
        </header>

        <div className="flex-1 overflow-auto p-8 lg:p-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h1 className="text-5xl font-black tracking-tighter mb-4">Faculty <span className="text-indigo-400">Control</span></h1>
                <p className="text-gray-400 font-medium text-lg">Provision credentials and oversee batch assignments.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(true)}
                className="px-8 py-5 bg-white text-gray-900 hover:bg-indigo-50 rounded-[32px] font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-indigo-500/5 transition-all active:scale-95"
              >
                <UserPlus size={20} />
                Add Faculty Member
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
               <div className="p-8 bg-[#0D121F] border border-white/5 rounded-[40px] shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[2px] text-gray-500 mb-6">Total Faculty</p>
                    <p className="text-5xl font-black text-indigo-400">{teachers.length}</p>
                    <p className="text-xs text-gray-500 mt-2 font-bold tracking-tight">Active accounts on platform</p>
               </div>
            </div>

            {/* Table */}
            <div className="bg-[#0D121F] border border-white/5 rounded-[48px] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/[0.02] border-b border-white/5">
                      <th className="py-8 px-10 font-black text-gray-500 text-[10px] uppercase tracking-[3px]">Expertise & Name</th>
                      <th className="py-8 px-10 font-black text-gray-500 text-[10px] uppercase tracking-[3px]">Batch Group</th>
                      <th className="py-8 px-10 font-black text-gray-500 text-[10px] uppercase tracking-[3px]">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr><td colSpan="3" className="py-20 text-center text-gray-500 font-bold uppercase tracking-widest animate-pulse">Syncing Database...</td></tr>
                    ) : teachers.length === 0 ? (
                      <tr><td colSpan="3" className="py-20 text-center text-gray-500 font-bold uppercase tracking-widest italic">No Faculty Registered</td></tr>
                    ) : (
                      teachers.map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-white/[0.01] transition-colors group">
                          <td className="py-8 px-10">
                            <div className="flex items-center gap-6">
                              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center font-black text-indigo-400 shadow-inner group-hover:bg-indigo-500/20 transition-all">
                                {teacher.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-black text-lg text-white mb-1">{teacher.name}</p>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{teacher.subject}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-8 px-10">
                            <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[2px] bg-white/5 text-indigo-400 border border-white/5 shadow-sm">
                              {teacher.batchType}
                            </span>
                          </td>
                          <td className="py-8 px-10">
                             <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-indigo-400 cursor-pointer hover:text-white transition-colors">
                                View Full Analytics
                             </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#060B12]/80 backdrop-blur-xl">
          <div className="bg-[#0D121F] border border-white/5 rounded-[48px] w-full max-w-2xl p-12 shadow-[0_0_100px_rgba(79,70,229,0.1)] animate-fade-in-up">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black tracking-tighter">Add <span className="text-indigo-400">Faculty Member</span></h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors"><X size={32}/></button>
            </div>
            <form onSubmit={handleAddTeacher} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                        <label className="px-5 text-[10px] font-black uppercase tracking-[2px] text-gray-500">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-3xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-bold" required />
                   </div>
                   <div className="space-y-2">
                        <label className="px-5 text-[10px] font-black uppercase tracking-[2px] text-gray-500">Contact Number</label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-3xl outline-none focus:border-indigo-500 transition-all font-bold text-indigo-400" required />
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="px-5 text-[10px] font-black uppercase tracking-[2px] text-gray-500">Official Email (Portal ID)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-3xl outline-none focus:border-indigo-500 transition-all font-bold" required />
                </div>

                <div className="space-y-2">
                  <label className="px-5 text-[10px] font-black uppercase tracking-[2px] text-gray-500">Credentials (Access Key)</label>
                  <input type="text" name="password" value={formData.password} onChange={handleInputChange} className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-3xl outline-none focus:border-indigo-500 transition-all font-bold text-indigo-400" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                        <label className="px-5 text-[10px] font-black uppercase tracking-[2px] text-gray-500">Core Expertise</label>
                        <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-3xl outline-none focus:border-indigo-500 transition-all font-bold appearance-none cursor-pointer" required>
                          <option value="" disabled className="bg-[#0D121F]">Select Subject</option>
                          <option value="Physics" className="bg-[#0D121F]">Physics</option>
                          <option value="Chemistry" className="bg-[#0D121F]">Chemistry</option>
                          <option value="Mathematics" className="bg-[#0D121F]">Mathematics</option>
                          <option value="Biology" className="bg-[#0D121F]">Biology</option>
                          <option value="English" className="bg-[#0D121F]">English</option>
                          <option value="SST" className="bg-[#0D121F]">SST</option>
                        </select>
                   </div>
                   <div className="space-y-2">
                        <label className="px-5 text-[10px] font-black uppercase tracking-[2px] text-gray-500">Batch Assignment</label>
                        <select name="batchType" value={formData.batchType} onChange={handleInputChange} className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-3xl outline-none focus:border-indigo-500 transition-all font-bold appearance-none cursor-pointer" required>
                          <option value="MWF" className="bg-[#0D121F]">MWF Group</option>
                          <option value="TTS" className="bg-[#0D121F]">TTS Group</option>
                          <option value="Full Week" className="bg-[#0D121F]">Full Week</option>
                        </select>
                   </div>
                </div>
              
                <button type="submit" className="w-full py-6 mt-6 bg-white text-gray-900 hover:bg-indigo-50 rounded-3xl font-black uppercase tracking-[3px] shadow-2xl transition-all active:scale-[0.98]">Authorize Faculty Account</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
