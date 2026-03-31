import React, { useState } from 'react';
import { Mail, Bell } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ComingSoonBanner = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address', { position: 'bottom-right' });
      return;
    }
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      toast.success("✅ You're on the list! We'll email you when JEE/NEET launches", {
        position: 'bottom-right',
        style: { background: '#0D2240', color: '#fff', border: '1px solid #F5A623' },
      });
    }, 1200);
  };

  return (
    <section className="bg-[#0D2240] py-16 px-6 md:px-20 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5A623]/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left Side */}
        <div className="w-full lg:w-1/2 text-left">
          <span className="bg-[#F5A623] text-white font-black text-xs px-4 py-1.5 rounded-sm uppercase tracking-widest mb-6 inline-block">Expanding Soon</span>
          <h2 className="text-white font-outfit font-black text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
            JEE • NEET
          </h2>
          <p className="text-white/70 font-inter text-lg lg:text-xl max-w-lg mb-0 font-medium">
            Elite competitive exam coaching coming mid-2026!
          </p>
        </div>

        {/* Right Side - Email Subscription */}
        <div className="w-full lg:w-[40%] bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#888888] w-5 h-5 pointer-events-none" />
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status !== 'idle'}
                className="w-full pl-16 pr-6 py-5 bg-white border-2 border-transparent focus:border-[#F5A623] rounded-full text-[#0A0A0A] font-medium outline-none transition-all placeholder:text-[#888888]/60 disabled:opacity-50"
              />
            </div>
            
            <button 
              type="submit"
              disabled={status !== 'idle'}
              className="btn-primary flex items-center justify-center gap-3 transition-all cursor-pointer bg-[#F5A623] text-white font-black py-5 rounded-full text-lg shadow-xl shadow-[#F5A623]/20 disabled:opacity-80"
              style={status !== 'idle' ? { transform: 'scale(1)', boxShadow: 'none'} : {}}
            >
              {status === 'loading' ? (
                'Processing...'
              ) : status === 'success' ? (
                'Subscribed ✅'
              ) : (
                <>Notify Me <Bell className="w-5 h-5" /></>
              )}
            </button>
            
            <p className="text-white/50 text-[13px] font-medium italic text-center">
              Be the first to know when we launch!
            </p>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ComingSoonBanner;
