import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, GraduationCap, BookOpenCheck, ArrowRight } from 'lucide-react';

const PortalLogin = () => {
  const navigate = useNavigate();

  const hubs = [
    {
      id: 'admin',
      title: 'Administrator Hub',
      desc: 'System management, faculty oversight, and backend controls.',
      icon: <ShieldCheck size={32} />,
      color: 'from-gray-900 to-slate-900',
      label: 'Admin',
      path: '/admin-login'
    },
    {
      id: 'teacher',
      title: 'Educator Space',
      desc: 'Attendance tracking, marks entry, and student feedback.',
      icon: <BookOpenCheck size={32} />,
      color: 'from-teal-600 to-cyan-600',
      label: 'Faculty',
      path: '/teacher-login'
    },
    {
      id: 'student',
      title: 'Success Portal',
      desc: 'Self-performance records, attendance, and teacher remarks.',
      icon: <GraduationCap size={32} />,
      color: 'from-indigo-600 to-purple-600',
      label: 'Student',
      path: '/student-login'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center p-6 relative overflow-hidden font-exo">
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-[80px]" />
      
      <div className="w-full max-w-5xl relative z-10 text-center mb-16">
        <a href="/" className="inline-flex items-center gap-4 mb-10 transition-transform hover:scale-105">
          <img src="/aakashlogo.png" alt="Aakash Logo" className="h-12 w-auto" />
          <div className="h-8 w-px bg-gray-200"></div>
          <span className="text-3xl font-orbitron font-extrabold text-[#0D2240] tracking-[3px] uppercase">
            Aakash<span className="text-blue-600">Portal</span>
          </span>
        </a>
        <h1 className="text-5xl font-orbitron font-extrabold text-gray-900 mb-4 tracking-[-1px]">Management Systems</h1>
        <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">Access your dedicated administrative or academic dashboard by selecting your role below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10 px-4">
        {hubs.map((hub) => (
          <button
            key={hub.id}
            onClick={() => navigate(hub.path)}
            className="group relative bg-white p-8 md:p-10 rounded-[48px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-start text-left transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] overflow-hidden active:scale-[0.97]"
          >
            {/* Hover Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${hub.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
            
            <div className={`p-5 rounded-[28px] bg-gradient-to-br ${hub.color} text-white mb-10 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-500`}>
                {hub.icon}
            </div>
            
            <span className={`text-[11px] font-black uppercase tracking-[3px] mb-3 ${hub.id === 'admin' ? 'text-gray-500' : hub.id === 'teacher' ? 'text-teal-600' : 'text-indigo-600'}`}>
                {hub.label} Portal
            </span>
            <h3 className="text-2xl font-orbitron font-bold text-gray-900 mb-4 tracking-tight">{hub.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-10 flex-1">{hub.desc}</p>
            
            <div className="flex items-center gap-3 font-extrabold text-[#0D2240] group-hover:text-blue-600 transition-colors">
                <span className="uppercase text-xs tracking-widest">Enter Securely</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-20 flex flex-col items-center gap-4 opacity-40">
        <div className="h-px w-24 bg-gray-300"></div>
        <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[5px] text-center">Aakash Academy Infrastructure v2.0</p>
      </div>
    </div>
  );
};

export default PortalLogin;
