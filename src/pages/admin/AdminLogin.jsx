import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, ShieldCheck, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const { currentUser, isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in as admin
  useEffect(() => {
    if (isSignedIn && currentUser?.role === 'admin') {
      navigate('/admin');
    }
  }, [isSignedIn, currentUser, navigate]);

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-4 relative overflow-hidden font-exo">
      {/* Background aesthetics */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]" />
      
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

        <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-2xl text-center">
          <p className="text-gray-300 mb-8 font-medium">Please sign in to your authorized administrator account to access backend controls.</p>
          
          <button
            onClick={() => navigate('/login')}
            className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-orbitron font-bold tracking-[2px] transition-all duration-300 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-4 active:scale-[0.98] group"
          >
            <LogIn size={22} className="group-hover:translate-x-1 transition-transform" />
            <span>SECURE ADMIN LOGIN</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform opacity-50" />
          </button>
          
          <div className="mt-8 flex items-center gap-3 justify-center opacity-40">
            <div className="h-px w-8 bg-white/20"></div>
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Aakash Secure Cloud</span>
            <div className="h-px w-8 bg-white/20"></div>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/portal-login')}
          className="mt-8 mx-auto flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          Back to Portal Selection
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
