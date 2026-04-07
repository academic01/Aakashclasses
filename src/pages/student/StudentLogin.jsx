import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, LogIn, Eye, EyeOff, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.role === 'student' || !currentUser?.role) {
      if (currentUser) navigate('/student-offline');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await login(email.trim(), password.trim());
      // Role student is the default fallback, if teacher/admin accidentally log in here, just send them to dashboard
      toast.success(`Welcome back, ${user.name}! Ready to study?`);
      navigate('/student-offline');
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex flex-col items-center justify-center p-4 relative overflow-hidden font-exo">
      {/* Background aesthetics - Energetic Purple/Indigo/Pink Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
            <div className="inline-flex p-5 rounded-[40px] bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-200 mb-6 border border-white/20">
                <GraduationCap size={48} className="text-white" />
            </div>
          <h1 className="text-3xl font-orbitron font-bold text-gray-800 tracking-[1px] uppercase mb-1">
            Student<span className="text-indigo-600">Portal</span>
          </h1>
          <p className="text-gray-500 text-sm font-semibold tracking-wider font-exo uppercase">Aakash Academics | Offline Dashboard</p>
        </div>

        <div className="bg-white/70 backdrop-blur-3xl p-10 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Student Login ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors">
                  <User size={18} className="text-gray-400 group-focus-within:text-indigo-600" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50/80 border-2 border-transparent rounded-[24px] focus:outline-none focus:border-indigo-400 focus:bg-white text-gray-800 transition-all duration-300 font-medium"
                  placeholder="student@aakash.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Portal Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400 group-focus-within:text-indigo-600" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-4 bg-gray-50/80 border-2 border-transparent rounded-[24px] focus:outline-none focus:border-indigo-400 focus:bg-white text-gray-800 transition-all duration-300 font-medium"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white rounded-[24px] font-orbitron font-bold tracking-[2px] transition-all duration-500 shadow-xl shadow-indigo-600/30 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>START STUDYING</span>
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-10 flex items-center justify-center gap-8">
            <div className="h-px bg-gray-200 flex-1"></div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Student Help Center</p>
            <div className="h-px bg-gray-200 flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
