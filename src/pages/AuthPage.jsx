import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AuthPage = ({ type = 'login' }) => {
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    otp: ''
  });
  const [showOtpField, setShowOtpField] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === 'login') {
        if (showOtpField) {
           // Mock Validating OTP
           if (formData.otp.length === 6) {
              await login(formData.email, 'password123'); // Hack for mock
              navigate('/dashboard');
           } else {
              toast.error('Invalid OTP');
           }
        } else {
           await login(formData.email, formData.password);
           navigate('/dashboard');
        }
      } else {
        await signup(formData.email, formData.password, formData.name);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = () => {
    if (!formData.email) return toast.error('Enter email/phone first');
    setShowOtpField(true);
    toast.success('OTP sent to ' + formData.email);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 bg-graph py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-[#E5E5E5] p-8 md:p-12 rounded-[2.5rem] shadow-xl text-center"
      >
        <Link to="/" className="inline-block mb-10">
          <img 
            src="/logo.png" 
            alt="Aakash Academics" 
            className="h-[80px] w-auto object-contain"
          />
        </Link>
        <h2 className="text-3xl font-orbitron font-bold text-brandNavy mb-2 uppercase tracking-wide">
          {type === 'login' ? 'Welcome Back' : 'Join the Academy'}
        </h2>
        <p className="text-textMuted font-exo mb-8 font-semibold">
          {type === 'login' ? 'Continue your journey to the stars.' : 'Start your excellence journey today.'}
        </p>

        <button 
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 border border-[#E5E5E5] rounded-xl font-exo font-bold text-sm text-brandNavy hover:bg-gray-50 transition-all mb-6"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pwa/google.svg" className="w-5 h-5" alt="" />
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
           <div className="flex-grow h-px bg-[#F0F0F0]"></div>
           <span className="text-[10px] font-orbitron font-bold text-textMuted uppercase tracking-widest">OR EMAIL</span>
           <div className="flex-grow h-px bg-[#F0F0F0]"></div>
        </div>

        <form className="space-y-6 text-left" onSubmit={handleSubmit}>
          {type === 'signup' && (
            <div>
              <label className="block text-xs font-orbitron font-bold text-brandNavy uppercase tracking-widest mb-2">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#F9F9F9] border border-[#E5E5E5] px-4 py-3 rounded-xl focus:outline-none focus:border-brandBlue transition-all font-nunito" 
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-orbitron font-bold text-brandNavy uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#F9F9F9] border border-[#E5E5E5] px-4 py-3 rounded-xl focus:outline-none focus:border-brandBlue transition-all font-nunito" 
              placeholder="name@example.com"
            />
          </div>

          {!showOtpField ? (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-orbitron font-bold text-brandNavy uppercase tracking-widest">Password</label>
                {type === 'login' && <Link className="text-[10px] font-bold text-brandBlue hover:underline h-auto">FORGOT?</Link>}
              </div>
              <input 
                type="password" 
                required={!showOtpField}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#F9F9F9] border border-[#E5E5E5] px-4 py-3 rounded-xl focus:outline-none focus:border-brandBlue transition-all font-nunito" 
                placeholder="••••••••"
              />
              {type === 'login' && (
                <button 
                  type="button"
                  onClick={handleSendOtp}
                  className="mt-2 text-xs font-bold text-brandBlue hover:underline uppercase tracking-tighter"
                >
                  Login via OTP instead?
                </button>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-orbitron font-bold text-brandNavy uppercase tracking-widest mb-2">Verification Code</label>
              <input 
                type="text" 
                maxLength={6}
                value={formData.otp}
                onChange={(e) => setFormData({...formData, otp: e.target.value})}
                className="w-full bg-[#F9F9F9] border border-[#E5E5E5] px-4 py-4 text-center text-2xl tracking-[1em] rounded-xl focus:outline-none focus:border-brandBlue transition-all font-orbitron font-bold" 
                placeholder="000000"
              />
              <p className="mt-2 text-[10px] text-textMuted uppercase font-bold text-center">Didnt receive? <span className="text-brandBlue cursor-pointer">Resend (59s)</span></p>
            </div>
          )}
          
          <button 
            disabled={loading}
            className="btn-primary w-full shadow-lg h-14 text-lg flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (type === 'login' ? (showOtpField ? 'Verify & Login' : 'Log In') : 'Create Account')}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-[#F0F0F0]">
          <p className="text-textMuted font-exo font-semibold text-sm">
            {type === 'login' ? "Don't have an account?" : "Already have an account?"}
            <Link to={type === 'login' ? '/signup' : '/login'} className="text-brandBlue hover:underline ml-2 uppercase font-bold text-xs tracking-widest" onClick={() => setShowOtpField(false)}>
              {type === 'login' ? 'Enroll Now' : 'Log In'}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
