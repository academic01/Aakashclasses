import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { SignIn, SignUp } from '@clerk/clerk-react';

const AuthPage = ({ type = 'login' }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 bg-[#11111199] backdrop-blur-sm overflow-y-auto pt-10 pb-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-50 p-2 flex items-center gap-2 font-bold"
        >
          <X className="w-5 h-5" /> Close
        </button>

        <div className="shadow-2xl rounded-[32px] overflow-hidden">
          {type === 'signup' ? (
            <SignUp 
              routing="virtual"
              signInUrl="/login" 
              forceRedirectUrl="/goal-selection"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-brandBeige border-none shadow-none",
                  headerTitle: "text-brandNavy font-outfit font-black",
                  headerSubtitle: "text-gray-500",
                  socialButtonsBlockButton: "bg-white border-gray-200 hover:bg-gray-50",
                  formButtonPrimary: "bg-[#5A4BDA] hover:bg-[#4a3dba] text-white",
                  footerActionLink: "text-[#5A4BDA] font-bold"
                }
              }}
            />
          ) : (
            <SignIn 
              routing="virtual"
              signUpUrl="/signup" 
              forceRedirectUrl="/goal-selection"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-brandBeige border-none shadow-none",
                  headerTitle: "text-brandNavy font-outfit font-black",
                  headerSubtitle: "text-gray-500",
                  socialButtonsBlockButton: "bg-white border-gray-200 hover:bg-gray-50",
                  formButtonPrimary: "bg-[#5A4BDA] hover:bg-[#4a3dba] text-white",
                  footerActionLink: "text-[#5A4BDA] font-bold"
                }
              }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
