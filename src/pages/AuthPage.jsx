import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { X, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    mobile: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        navigate('/goal-selection');
      } else {
        if (!formData.name || !formData.mobile) {
            toast.error('Please fill all fields');
            setLoading(false);
            return;
        }
        await signup(formData.email, formData.password, formData.name, formData.mobile);
        navigate('/goal-selection');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/goal-selection');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 bg-[#11111199] backdrop-blur-sm pt-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-[440px] bg-white rounded-[32px] shadow-2xl overflow-hidden relative"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors z-50 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10">
          <div className="mb-8 text-center">
            <img src="/aakashlogo.png" className="w-24 mx-auto mb-6" alt="Logo" />
            <h2 className="text-[26px] font-bold text-gray-800 mb-2">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Login to access your study material' : 'Join Aakash for a brighter future'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode='wait'>
                {!isLogin && (
                   <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    key="signup-fields"
                    className="space-y-4"
                   >
                     <div className="relative group">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#5A4BDA] transition-colors" />
                       <input
                         type="text"
                         required
                         value={formData.name}
                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                         className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#5A4BDA] focus:ring-4 focus:ring-[#5A4BDA] focus:ring-opacity-10 transition-all text-gray-800 font-medium"
                         placeholder="Full Name"
                       />
                     </div>
                     <div className="relative group">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#5A4BDA] transition-colors" />
                       <input
                         type="tel"
                         required
                         value={formData.mobile}
                         onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                         className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#5A4BDA] focus:ring-4 focus:ring-[#5A4BDA] focus:ring-opacity-10 transition-all text-gray-800 font-medium"
                         placeholder="Mobile Number"
                       />
                     </div>
                   </motion.div>
                )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#5A4BDA] transition-colors" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#5A4BDA] focus:ring-4 focus:ring-[#5A4BDA] focus:ring-opacity-10 transition-all text-gray-800 font-medium"
                placeholder="Email Address"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#5A4BDA] transition-colors" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#5A4BDA] focus:ring-4 focus:ring-[#5A4BDA] focus:ring-opacity-10 transition-all text-gray-800 font-medium"
                placeholder="Password"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-sm font-semibold text-[#5A4BDA] hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#5A4BDA] text-white rounded-2xl font-bold text-[16px] shadow-lg shadow-[#5A4BDA]/30 hover:bg-[#4a3dba] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? 'Processing...' : (
                 <>
                   {isLogin ? 'Login Now' : 'Create Account'}
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-grow h-px bg-gray-100"></div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-2">Social Login</span>
            <div className="flex-grow h-px bg-gray-100"></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all shadow-sm group"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pwa/google.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
              <span className="text-[15px] font-bold text-gray-700">Continue with Google</span>
            </button>
          </div>

          <div className="mt-8 text-center">
             <p className="text-gray-500 font-medium">
               {isLogin ? "Don't have an account?" : "Already have an account?"}
               <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-[#5A4BDA] font-bold hover:underline"
               >
                 {isLogin ? 'Sign up' : 'Login'}
               </button>
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
