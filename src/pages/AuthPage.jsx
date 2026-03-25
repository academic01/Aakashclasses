import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { X, Edit2, ShieldCheck, MessageSquare } from 'lucide-react';

const AuthPage = ({ type = 'login' }) => {
  const { login, signup, loginWithGoogle, setupRecaptcha } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: phone entry, 2: OTP

  const [formData, setFormData] = useState({
    phone: '',
    name: ''
  });

  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let timer;
    if (step === 2 && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      return toast.error('Enter a valid 10-digit mobile number');
    }
    setLoading(true);
    try {
      const formattedPhone = '+91' + formData.phone;
      const res = await setupRecaptcha(formattedPhone);
      setConfirmationResult(res);
      setStep(2);
      setTimeLeft(30);
      toast.success(`OTP sent to ${formData.phone}`);
      // Show mock tip
      setTimeout(() => {
        toast('Demo Mode: Enter any 6 digits to login.', { icon: 'ℹ️', duration: 4000 });
      }, 1000);
    } catch (err) {
      toast.error(err.message || 'Failed to send OTP');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;
    
    setLoading(true);
    try {
      if (confirmationResult && typeof confirmationResult.confirm === 'function') {
         await confirmationResult.confirm(otpValue);
         toast.success('Login Successful!');
         navigate('/goal-selection');
      } else {
         // Mock fallback just in case
         await login(formData.phone + '@mock.com', 'password123'); 
         toast.success('Login Successful!');
         navigate('/goal-selection');
      }
    } catch (err) {
      toast.error('Invalid OTP');
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
        className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden relative"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-50 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          // STEP 1: LOGIN / PHONE ENTRY
          <div className="p-8 pt-12">
            <div className="mb-8 text-center">
              <img src="/aakashlogo.png" className="w-32 mx-auto mb-6" alt="Logo" />
              <h2 className="text-[22px] font-bold text-gray-800 mb-2">Login / Register</h2>
              <p className="text-gray-500 text-sm">Please enter your mobile number to proceed</p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden focus-within:border-[#5A4BDA] focus-within:ring-1 focus-within:ring-[#5A4BDA] transition-all">
                  <div className="flex items-center justify-center px-4 bg-gray-50 border-r border-gray-300 text-gray-600 font-semibold text-sm">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-4 py-3.5 focus:outline-none text-gray-800 font-bold"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
              
              <div id="recaptcha-container"></div>

              <button
                type="submit"
                disabled={formData.phone.length < 10 || loading}
                className={`w-full py-3.5 rounded-xl font-bold text-[15px] transition-colors ${formData.phone.length >= 10 ? 'bg-[#5A4BDA] text-white hover:bg-[#4a3dba]' : 'bg-[#9ba3af] text-white cursor-not-allowed'}`}
              >
                {loading ? 'Processing...' : 'Proceed with Phone'}
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
               <div className="flex-grow h-px bg-gray-200"></div>
               <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">OR</span>
               <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-[15px] font-bold text-gray-700"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pwa/google.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>

            <div className="mt-8 text-center text-xs text-gray-400">
              By proceeding, you agree to our <a href="#" className="text-[#5A4BDA] hover:underline">Terms & Conditions</a> & <a href="#" className="text-[#5A4BDA] hover:underline">Privacy Policy</a>
            </div>
          </div>
        ) : (
          // STEP 2: OTP VERIFICATION
          <div className="p-8 pt-10">
            {/* Custom SVG/Wavy Illustration mimicking the PW screenshot */}
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Wavy background blob */}
                <svg className="absolute inset-0 w-full h-full text-[#e0f8ea]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" stroke="#333" strokeWidth="2" d="M47.7,-57.2C60.2,-46.8,67.6,-28.9,71.7,-10.8C75.9,7.4,76.8,25.9,68.7,40.1C60.6,54.3,43.5,64.2,25.1,69.5C6.7,74.8,-13,75.4,-30.1,69.6C-47.1,63.7,-61.5,51.4,-71.4,35.1C-81.3,18.8,-86.7,-1.5,-80.7,-18.2C-74.8,-35,-57.5,-48.1,-41.8,-57.8C-26,-67.6,-13,-74,2.5,-76.9C18.1,-79.8,35.2,-67.7,47.7,-57.2Z" transform="translate(100 100)" />
                </svg>

                {/* Icon Layout inside badge */}
                <div className="relative z-10 w-16 h-[88px] bg-white border-2 border-gray-800 rounded-lg flex flex-col items-center justify-center shadow-sm">
                  <div className="absolute -top-3 right-[-15px] bg-[#f97316] text-white px-2 py-1 rounded-[10px] border-2 border-gray-800 flex items-center gap-1 z-20">
                    <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
                    <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
                    <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
                    <div className="absolute w-2 h-2 bg-[#f97316] border-b-2 border-l-2 border-gray-800 -bottom-[5px] left-3 transform -rotate-45"></div>
                  </div>
                  <div className="w-[42px] h-[42px] rounded-full bg-black border border-gray-800 flex items-center justify-center text-white font-serif font-bold text-[18px]">
                    <span className="leading-none tracking-tighter">A</span>
                  </div>
                  <div className="absolute bottom-2 w-full px-2 flex justify-center">
                    <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex text-left flex-col w-full">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-800">Enter OTP</h2>
                <div className="bg-[#60d69a] shadow-sm text-white px-3 py-0.5 rounded-full flex items-center gap-[2px]">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <p className="text-gray-500 text-[13px] mt-1.5 flex items-center gap-1">
                6 digit code sent to <span className="font-semibold text-[#5A4BDA] ml-1">{formData.phone}</span>
                <button onClick={() => setStep(1)} className="ml-1 focus:outline-none">
                  <Edit2 className="w-3.5 h-3.5 text-[#5A4BDA] hover:text-[#4a3dba]" />
                </button>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="mt-8">
              <div className="flex gap-[10px] justify-between mb-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    className={`w-[45px] h-[52px] text-center text-xl font-bold rounded-[10px] border-2 ${digit ? 'border-[#5A4BDA] text-[#5A4BDA]' : 'border-gray-200'} focus:border-[#5A4BDA] focus:outline-none focus:ring-4 focus:ring-[#5a4bda] focus:ring-opacity-10 transition-all bg-white shadow-sm`}
                  />
                ))}
              </div>

              <div className="text-gray-800 text-xs font-bold font-mono text-left w-full mb-6">
                {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, '0')}` : <span className="text-[#5A4BDA] cursor-pointer hover:underline" onClick={() => setTimeLeft(30)}>Resend OTP</span>}
              </div>

              <button
                type="submit"
                disabled={otp.join('').length !== 6 || loading}
                className={`w-full py-3.5 rounded-xl font-bold text-[15px] transition-colors ${otp.join('').length === 6 ? 'bg-[#9ba3af] text-white hover:bg-gray-500' : 'bg-[#9ba3af] text-white cursor-not-allowed'}`}
                style={otp.join('').length === 6 ? {} : { backgroundColor: '#9ca3af' }} // Matching screenshot's grey out
              >
                {loading ? 'Verifying...' : 'Verify & Proceed'}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;
