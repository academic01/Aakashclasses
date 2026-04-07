import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, LogIn, Eye, EyeOff, BookOpenCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.role === 'teacher') {
      navigate('/teacher-offline');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await login(email.trim(), password.trim());
      if (user.role !== 'teacher') {
        toast.error("Unauthorized. Only faculty members can access this portal.");
        return;
      }
      toast.success(`Welcome back, Professor ${user.name}`);
      navigate('/teacher-offline');
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-teal-50/30 flex flex-col items-center justify-center p-4 relative overflow-hidden font-exo">
      {/* Background aesthetics - Soft Teal/Cyan Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-3xl bg-teal-100 shadow-sm mb-6 border border-teal-200">
                <BookOpenCheck size={48} className="text-teal-600" />
            </div>
          <h1 className="text-3xl font-orbitron font-bold text-gray-800 tracking-wider uppercase mb-1">
            Faculty<span className="text-teal-600">Portal</span>
          </h1>
          <p className="text-gray-500 text-sm font-semibold tracking-wider font-exo uppercase">Aakash Academics | Educator Interface</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-teal-100/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Faculty ID / Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors">
                  <User size={18} className="text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 text-gray-800 transition-all duration-300"
                  placeholder="name@aakash.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Staff Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 text-gray-800 transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-teal-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white rounded-2xl font-orbitron font-bold tracking-[2px] transition-all duration-300 shadow-xl shadow-teal-500/20 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>ACCESS PORTAL</span>
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-gray-400 text-xs font-medium">
          Confidential Faculty Access Point.<br/>Contact IT Support for login issues.
        </p>
      </div>
    </div>
  );
};

export default TeacherLogin;
