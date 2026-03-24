import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthPage = ({ type = 'login' }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-graph">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-[#E5E5E5] p-8 md:p-12 rounded-[2.5rem] shadow-xl text-center"
      >
        <Link to="/" className="inline-block mb-10">
          <img 
            src="/logo.png" 
            alt="Aakash Academics" 
            className="h-[90px] w-auto object-contain"
          />
        </Link>
        <h2 className="text-3xl font-orbitron font-bold text-brandNavy mb-2 uppercase tracking-wide">
          {type === 'login' ? 'Welcome Back' : 'Join the Academy'}
        </h2>
        <p className="text-textMuted font-exo mb-8 font-semibold">
          {type === 'login' ? 'Continue your journey to the stars.' : 'Start your excellence journey today.'}
        </p>

        <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-orbitron font-bold text-brandNavy uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-[#F9F9F9] border border-[#E5E5E5] px-4 py-3 rounded-xl focus:outline-none focus:border-brandBlue transition-all font-nunito" 
              placeholder="name@university.com"
            />
          </div>
          <div>
            <label className="block text-xs font-orbitron font-bold text-brandNavy uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-[#F9F9F9] border border-[#E5E5E5] px-4 py-3 rounded-xl focus:outline-none focus:border-brandBlue transition-all font-nunito" 
              placeholder="••••••••"
            />
          </div>
          {type === 'signup' && (
            <div>
              <label className="block text-xs font-orbitron font-bold text-brandNavy uppercase tracking-widest mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-[#F9F9F9] border border-[#E5E5E5] px-4 py-3 rounded-xl focus:outline-none focus:border-brandBlue transition-all font-nunito" 
                placeholder="John Doe"
              />
            </div>
          )}
          
          <button className="btn-primary w-full shadow-lg h-14 text-lg">
            {type === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-[#F0F0F0]">
          <p className="text-textMuted font-exo font-semibold">
            {type === 'login' ? "Don't have an account?" : "Already have an account?"}
            <Link to={type === 'login' ? '/signup' : '/login'} className="text-brandBlue hover:underline ml-2">
              {type === 'login' ? 'Enroll Now' : 'Log In'}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
