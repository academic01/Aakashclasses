import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { X } from 'lucide-react';

const AuthPage = ({ type: initialType = 'login' }) => {
  const navigate = useNavigate();
  const [authType, setAuthType] = useState(initialType);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 bg-[#11111199] backdrop-blur-sm pt-0 overflow-y-auto pt-10 pb-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[480px] relative flex flex-col items-center"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute -top-12 right-0 text-white hover:text-gray-200 transition-colors z-50 p-2 bg-black/20 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full shadow-2xl rounded-3xl overflow-hidden bg-white">
          {authType === 'login' ? (
            <div className="flex flex-col">
              <SignIn 
                routing="hash"
                signUpUrl="/register"
                afterSignInUrl="/goal-selection"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none py-8",
                    headerTitle: "text-2xl font-bold font-orbitron text-gray-900",
                    headerSubtitle: "text-gray-500",
                    socialButtonsBlockButton: "rounded-xl border-gray-200 hover:bg-gray-50",
                    formButtonPrimary: "bg-[#5A4BDA] hover:bg-[#4a3dba] text-sm font-bold py-3 rounded-xl",
                    footerActionLink: "text-[#5A4BDA] font-bold hover:text-[#4a3dba]"
                  }
                }}
              />
              <div className="pb-8 text-center text-sm text-gray-500 bg-white">
                Don't have an account? <button onClick={() => setAuthType('signup')} className="text-[#5A4BDA] font-bold hover:underline">Sign up</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <SignUp 
                routing="hash"
                signInUrl="/login"
                afterSignUpUrl="/goal-selection"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none py-8",
                    headerTitle: "text-2xl font-bold font-orbitron text-gray-900",
                    headerSubtitle: "text-gray-500",
                    socialButtonsBlockButton: "rounded-xl border-gray-200 hover:bg-gray-50",
                    formButtonPrimary: "bg-[#5A4BDA] hover:bg-[#4a3dba] text-sm font-bold py-3 rounded-xl",
                    footerActionLink: "text-[#5A4BDA] font-bold hover:text-[#4a3dba]"
                  }
                }}
              />
              <div className="pb-8 text-center text-sm text-gray-500 bg-white">
                Already have an account? <button onClick={() => setAuthType('login')} className="text-[#5A4BDA] font-bold hover:underline">Log in</button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
