import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, LogIn, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      navigate('/admin');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await login(email.trim(), password.trim());
      if (user.role !== 'admin') {
        toast.error("Unauthorized. Only administrators can access this panel.");
        return;
      }
      toast.success(`Welcome back, Administrator ${user.name}`);
      navigate('/admin');
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-fill for convenience
  useEffect(() => {
    setEmail('aakashacademics01@gmail.com');
    setPassword('Aakash@009');
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-4 relative overflow-hidden font-exo">
      {/* Background aesthetics - Sleek Dark Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-3xl bg-blue-500/10 mb-6 border border-blue-500/20">
                <ShieldCheck size={48} className="text-blue-400" />
            </div>
          <h1 className="text-4xl font-orbitron font-bold text-white tracking-widest uppercase mb-2">
            Admin<span className="text-blue-500">Panel</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium">Restricted Access Interface</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-tighter">Identity Identifier</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors">
                  <User size={18} className="text-gray-500 group-focus-within:text-blue-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 focus:ring-0 text-white transition-all duration-300"
                  placeholder="admin@aakash.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-tighter">Security Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500 group-focus-within:text-blue-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-4 bg-white/5 border-2 border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 focus:ring-0 text-white transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-blue-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-orbitron font-bold tracking-[2px] transition-all duration-300 shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>INITIALIZE LOGIN</span>
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-gray-500 text-xs">
          By logging in, you agree to our Internal Security Policy.<br/>Unauthorized access is strictly monitored.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
