import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabaseDB } from '../../lib/supabaseDB';
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
      const data = await supabaseDB.getTeachers();
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
      await supabaseDB.createTeacher(formData);
      toast.success("Teacher account created successfully!");
      setShowAddModal(false);
      setFormData({ name: '', email: '', password: '', subject: '', mobile: '', batchType: 'MWF' });
      fetchTeachers();
    } catch (err) {
      toast.error(err.message || "Failed to create teacher");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-exo text-textPrimary">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-brandNavy text-white transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-orbitron font-bold">Admin<span className="text-brandBlue">Panel</span></span>
            <button className="lg:hidden text-gray-300" onClick={() => setSidebarOpen(false)}><X size={24}/></button>
          </div>
          
          <div className="flex items-center gap-3 mb-8 p-3 bg-white/10 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-brandBlue flex items-center justify-center text-white font-bold text-xl">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">{currentUser?.name}</p>
              <p className="text-xs text-gray-300">System Administrator</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-brandBlue rounded-lg text-white font-semibold transition-all">
              <Users size={20} />
              Teacher Management
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg font-semibold transition-all opacity-50 cursor-not-allowed">
              <Activity size={20} />
              System Reports
            </button>
          </nav>

          <button onClick={logout} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg font-semibold transition-all">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-brandNavy">
            <Menu size={24} />
          </button>
          <span className="font-orbitron font-bold text-brandNavy text-xl">Admin<span className="text-brandBlue">Panel</span></span>
          <div className="w-6 hidden"></div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-brandNavy">Teacher Management</h1>
              <p className="text-textMuted mt-1">Manage teacher accounts, assign subjects, and configure batch access.</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-brandBlue hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all"
            >
              <UserPlus size={20} />
              Add New Teacher
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-brandBlue">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-textMuted font-medium">Total Teachers</p>
                <p className="text-2xl font-bold text-brandNavy">{teachers.length}</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-4 px-6 font-semibold text-textMuted text-sm">Teacher Info</th>
                    <th className="py-4 px-6 font-semibold text-textMuted text-sm">Login ID</th>
                    <th className="py-4 px-6 font-semibold text-textMuted text-sm">Subject</th>
                    <th className="py-4 px-6 font-semibold text-textMuted text-sm">Batch Type</th>
                    <th className="py-4 px-6 font-semibold text-textMuted text-sm">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="5" className="py-8 text-center text-textMuted">Loading teachers...</td></tr>
                  ) : teachers.length === 0 ? (
                    <tr><td colSpan="5" className="py-8 text-center text-textMuted">No teachers registered yet. Click 'Add New Teacher' to continue.</td></tr>
                  ) : (
                    teachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-brandNavy shrink-0">
                              {teacher.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-brandNavy">{teacher.name}</p>
                              <p className="text-xs text-textMuted">{teacher.mobile}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm">{teacher.email}</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-brandBlue">
                            <BookOpen size={14} />
                            {teacher.subject}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700">
                            <Clock size={14} />
                            {teacher.batchType}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm"><span className="text-green-500 font-medium">Active</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-bold text-brandNavy">Create Teacher Account</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
            </div>
            <form onSubmit={handleAddTeacher} className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-brandBlue" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">Mobile Number</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-brandBlue" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1">Login ID / Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-brandBlue" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1">Initial Password</label>
                  <input type="text" name="password" value={formData.password} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-brandBlue" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">Subject Matter</label>
                    <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-brandBlue cursor-pointer" required>
                      <option value="" disabled>Select Subject</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Biology">Biology</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">Assigned Batch</label>
                    <select name="batchType" value={formData.batchType} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-brandBlue cursor-pointer" required>
                      <option value="MWF">MWF (Mon, Wed, Fri)</option>
                      <option value="TTS">TTS (Tue, Thu, Sat)</option>
                      <option value="All Days">All Days</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-brandBlue hover:bg-blue-600 text-white rounded-lg font-bold shadow-md shadow-blue-500/20 transition-all">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
