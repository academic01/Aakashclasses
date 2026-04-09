import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, BookOpenCheck, ArrowRight } from 'lucide-react';

const TeacherLogin = () => {
  const { currentUser, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && currentUser?.role === 'teacher') {
      navigate('/teacher-offline');
    }
  }, [isSignedIn, currentUser, navigate]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center p-4 relative overflow-hidden font-exo">
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-teal-50 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-3xl bg-teal-500/10 mb-6 border border-teal-500/20">
                <BookOpenCheck size={48} className="text-teal-600" />
            </div>
          <h1 className="text-4xl font-orbitron font-bold text-gray-900 tracking-widest uppercase mb-2">
            Educator<span className="text-teal-600">Hub</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">Faculty Management Interface</p>
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] border border-gray-100 text-center">
          <p className="text-gray-600 mb-8 font-medium">Identify yourself to manage classes, attendance records, and student evaluations.</p>
          
          <button
            onClick={() => navigate('/login')}
            className="w-full py-5 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-orbitron font-bold tracking-[2px] transition-all duration-300 shadow-lg shadow-teal-600/20 flex items-center justify-center gap-4 active:scale-[0.98] group"
          >
            <LogIn size={22} className="group-hover:translate-x-1 transition-transform" />
            <span>TEACHER LOGIN</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform opacity-50" />
          </button>
        </div>
        
        <button 
          onClick={() => navigate('/portal-login')}
          className="mt-8 mx-auto flex items-center gap-2 text-gray-400 hover:text-teal-600 transition-colors text-sm font-bold uppercase tracking-widest"
        >
          Back to Portal Selection
        </button>
      </div>
    </div>
  );
};

export default TeacherLogin;
