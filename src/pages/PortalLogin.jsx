import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, LogIn, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const PortalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      console.log("Logged in user detected, redirecting to role:", currentUser.role);
      const role = currentUser.role || 'student';
      if (role === 'admin') navigate('/admin');
      else if (role === 'teacher') navigate('/teacher-offline');
      else if (role === 'student') navigate('/student-offline');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Trim inputs to avoid "Invalid credentials" due to accidental spaces
      const user = await login(email.trim(), password.trim());
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brandBlue/50 focus:border-brandBlue transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-textMuted hover:text-brandBlue transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
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
            
            {/* Demo credentials box removed for security */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortalLogin;
