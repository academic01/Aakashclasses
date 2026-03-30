import React from 'react';
import { Mail, Bell } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ComingSoonBanner = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("We'll notify you when we launch!", {
      style: { background: '#0D2240', color: '#fff', border: '1px solid #F5A623' },
      icon: '🔔'
    });
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
            JEE • NEET • CUET
          </h2>
          <p className="text-white/70 font-inter text-lg lg:text-xl max-w-lg mb-0 font-medium">
            World-class coaching for competitive exams coming soon! Stay tuned for more updates.
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
                className="w-full pl-16 pr-6 py-5 bg-white border-2 border-transparent focus:border-[#F5A623] rounded-full text-[#0A0A0A] font-medium outline-none transition-all placeholder:text-[#888888]/60"
              />
            </div>
            
            <button 
              type="submit"
              className="bg-[#F5A623] hover:bg-[#ff9f00] text-white font-black py-5 rounded-full text-lg shadow-xl shadow-[#F5A623]/20 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02]"
            >
              Notify Me <Bell className="w-5 h-5" />
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
