import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

const PortalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') navigate('/admin');
      else if (currentUser.role === 'teacher') navigate('/teacher-offline');
      else if (currentUser.role === 'student') navigate('/student-offline');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await login(email, password);
      // Navigation is handled by useEffect
      toast.success(`Welcome back, ${user.name}`);
    } catch (error) {
      // toast is handled in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lightBg1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brandBlue/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brandNavy/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10">
        <a href="/" className="flex items-center justify-center mb-8 gap-3">
          <img src="/logoaakash.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-3xl font-orbitron font-bold text-brandNavy tracking-wider uppercase">
            Aakash<span className="text-brandBlue">Portal</span>
          </span>
        </a>

        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-exo font-bold text-brandNavy mb-2">System Login</h1>
            <p className="text-textMuted text-sm">Enter your credentials to access your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">Login ID / Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-textMuted" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brandBlue/50 focus:border-brandBlue transition-all duration-300"
                  placeholder="admin@aakashclasses.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-textMuted" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brandBlue/50 focus:border-brandBlue transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-brandNavy to-brandBlue text-white rounded-lg font-exo font-bold tracking-wide transition-all duration-300 hover:shadow-[0_4px_20px_rgba(30,58,138,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Access Portal</span>
                </>
              )}
            </button>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-xs text-brandNavy font-medium flex flex-col gap-1 border border-blue-100">
              <span className="text-brandBlue font-bold block mb-1">Admin Demo Credentials:</span>
              <span>ID: admin@aakashclasses.com</span>
              <span>Pass: admin</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortalLogin;
