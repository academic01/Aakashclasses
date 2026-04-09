import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const facultyData = [
    { initial: "K", name: "Kishan Sharma", detail: "M.Sc. • 15+ Yrs Exp" },
    { initial: "A", name: "Aakash", detail: "B.Tech • 15+ Yrs Exp" },
    { initial: "V", name: "Vikas", detail: "M.A. • 9+ Yrs Exp" }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#0D2240] font-nunito" style={{ 
      height: 'calc(100vh - var(--navbar-height, 112px))',
      maxHeight: '680px',
      minHeight: '560px'
    }}>
      <style>{`
        .font-nunito { font-family: 'Nunito', sans-serif; }
        
        .hero-grid {
          display: grid;
          grid-template-columns: 48% 52%;
          height: 100%;
        }

        .left-column {
          background: #0D2240;
          padding: 30px 40px 30px 72px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 10;
          background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .right-column {
          position: relative;
          height: 100%;
          overflow: hidden;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-fade-up { animation: fadeUp 0.5s both; }
        .animate-float { animation: floatCard 3s ease-in-out infinite; }

        @media (max-width: 1024px) {
           .hero-grid { grid-template-columns: 1fr; height: auto; }
           .left-column { padding: 28px 20px 40px; margin-top: -60px; }
           .right-column { height: 320px; }
        }
      `}</style>

      <div className="hero-grid">
        {/* Left Column — Text Content */}
        <div className="left-column">
          {/* Element 1: Top Badge */}
          <div 
            className="inline-flex items-center gap-2 bg-[rgba(245,166,35,0.1)] border border-[rgba(245,166,35,0.35)] text-[#F5A623] px-4 py-1.5 rounded-full text-[11px] font-[700] tracking-[2px] w-fit mb-[18px] animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            🏆 INDIA'S LEADING EDUCATORS
          </div>

          {/* Element 2: Main Heading */}
          <h1 className="flex flex-col mb-[16px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.2)] animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-white text-[44px] lg:text-[52px] font-[900] leading-[1.0] tracking-[-1px]">EMPOWERING</span>
            <span className="text-white text-[44px] lg:text-[52px] font-[900] leading-[1.0] tracking-[-1px]">MINDS &</span>
            <span className="text-[#F5A623] text-[44px] lg:text-[52px] font-[900] leading-[1.0] tracking-[-1px]">BUILDING FUTURES</span>
          </h1>

          {/* Element 3: Subheading */}
          <p className="text-[rgba(255,255,255,0.68)] text-[15px] leading-[1.6] max-w-[440px] mb-[24px] animate-fade-up" style={{ animationDelay: '0.35s' }}>
            Expert coaching for Class VI-XII, CUET 2026 & Government Jobs by India's most qualified faculty.
          </p>

          {/* Element 4: Faculty Strip */}
          <div className="flex gap-[10px] mb-[24px] animate-fade-up" style={{ animationDelay: '0.45s' }}>
            {facultyData.map((f, i) => (
              <div key={i} className="inline-flex items-center gap-[10px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] border-l-[3px] border-l-[#F5A623] rounded-[0_10px_10px_0] p-[10px_14px]">
                <div className="w-[36px] h-[36px] rounded-full bg-[rgba(245,166,35,0.12)] border-[1.5px] border-[#F5A623] text-[#F5A623] text-[15px] font-[900] flex items-center justify-center shrink-0">
                  {f.initial}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white font-bold text-[13px] leading-tight">{f.name}</span>
                  <span className="text-[rgba(255,255,255,0.5)] text-[10px] leading-tight mt-0.5">{f.detail}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Element 5: Stats Row */}
          <div className="flex items-center mb-[28px] animate-fade-up" style={{ animationDelay: '0.55s' }}>
            <div className="pr-[24px] border-r border-[rgba(255,255,255,0.12)] mr-[24px]">
              <div className="text-[26px] font-[900] text-[#F5A623] tracking-[-0.5px] leading-none">8,000+</div>
              <div className="text-[11px] text-[rgba(255,255,255,0.5)] tracking-[0.5px] mt-[1px] uppercase font-bold">Happy Students</div>
            </div>
            <div className="pr-[24px] border-r border-[rgba(255,255,255,0.12)] mr-[24px]">
              <div className="text-[26px] font-[900] text-[#F5A623] tracking-[-0.5px] leading-none">39+</div>
              <div className="text-[11px] text-[rgba(255,255,255,0.5)] tracking-[0.5px] mt-[1px] uppercase font-bold">Yrs Combined Exp</div>
            </div>
            <div>
              <div className="text-[26px] font-[900] text-[#F5A623] tracking-[-0.5px] leading-none">98%</div>
              <div className="text-[11px] text-[rgba(255,255,255,0.5)] tracking-[0.5px] mt-[1px] uppercase font-bold">Success Rate</div>
            </div>
          </div>

          {/* Element 6: CTA Buttons */}
          <div className="flex gap-[14px] items-center animate-fade-up" style={{ animationDelay: '0.65s' }}>
            <button 
              onClick={() => navigate('/signup')} 
              className="bg-[#F5A623] text-[#0D2240] font-[900] text-[15px] p-[11px_30px] rounded-full border-none shadow-[0_6px_24px_rgba(245,166,35,0.4)] cursor-pointer transition-all hover:-translate-y-[2px] hover:shadow-[0_10px_32px_rgba(245,166,35,0.55)]"
            >
              Get Started Free →
            </button>
            <button 
              onClick={() => navigate('/courses')} 
              className="bg-transparent border-[1.5px] border-[rgba(255,255,255,0.3)] text-white font-[600] text-[15px] p-[11px_28px] rounded-full cursor-pointer transition-all hover:border-white hover:bg-[rgba(255,255,255,0.06)]"
            >
              Explore Courses
            </button>
          </div>
        </div>

        {/* Right Column — Faculty Image */}
        <div className="right-column">
          <motion.img 
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            src="/faculty-team.png" 
            alt="Expert Faculty" 
            className="absolute inset-0 w-full h-full object-cover object-[center_top]"
          />
          
          {/* Natural Brightness with Edge Fades Only */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <div className="absolute top-0 left-0 w-[25%] h-full bg-gradient-to-r from-[#0D2240] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-[#0D2240] to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-[8%] bg-gradient-to-b from-[#0D2240] to-transparent"></div>
          </div>

          <div className="absolute -right-[80px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[rgba(245,166,35,0.08)] pointer-events-none z-0"></div>

          {/* Floating Glass Cards - Hidden on mobile */}
          <div className="hidden lg:block">
            <div className="absolute top-[12%] right-[10%] z-[3] flex items-center gap-[10px] bg-[rgba(13,34,64,0.75)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.15)] rounded-[14px] p-[12px_16px] shadow-[0_12px_32px_rgba(0,0,0,0.3)] animate-float" style={{ animationDelay: '0s' }}>
              <span className="text-[22px] leading-none">🏆</span>
              <div className="flex flex-col text-left">
                <span className="text-white font-bold text-[13px] leading-tight">Best Faculty Team</span>
                <span className="text-[rgba(255,255,255,0.55)] text-[11px] leading-tight mt-0.5">Aakash Academics 2024</span>
              </div>
            </div>

            <div className="absolute top-[48%] right-[4%] z-[3] flex items-center gap-[10px] bg-[rgba(13,34,64,0.75)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.15)] rounded-[14px] p-[12px_16px] shadow-[0_12px_32px_rgba(0,0,0,0.3)] animate-float" style={{ animationDelay: '1.2s' }}>
              <span className="text-[22px] leading-none">⭐</span>
              <div className="flex flex-col text-left">
                <span className="text-white font-bold text-[13px] leading-tight">4.9 / 5.0 Rating</span>
                <span className="text-[rgba(255,255,255,0.55)] text-[11px] leading-tight mt-0.5 whitespace-nowrap">By 8,000+ Students</span>
              </div>
            </div>

            <div className="absolute bottom-[12%] right-[12%] z-[3] flex items-center gap-[10px] bg-[rgba(13,34,64,0.75)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.15)] rounded-[14px] p-[12px_16px] shadow-[0_12px_32px_rgba(0,0,0,0.3)] animate-float" style={{ animationDelay: '2.4s' }}>
              <span className="text-[22px] leading-none">🎓</span>
              <div className="flex flex-col text-left">
                <span className="text-white font-bold text-[13px] leading-tight">39+ Years</span>
                <span className="text-[rgba(255,255,255,0.55)] text-[11px] leading-tight mt-0.5 whitespace-nowrap">Combined Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
