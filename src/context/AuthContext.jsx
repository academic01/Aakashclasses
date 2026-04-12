import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { user, isLoaded, isSignedIn: isClerkSignedIn } = useUser();
  const { getToken } = useClerkAuth();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      if (isClerkSignedIn && user) {
        setCurrentUser({
          id: user.id,
          name: user.fullName || user.firstName,
          email: user.primaryEmailAddress?.emailAddress,
          role: user.publicMetadata.role || 'student'
        });
        setIsSignedIn(true);
      } else {
        setCurrentUser(null);
        setIsSignedIn(false);
      }
      setLoading(false);
    }
  }, [isLoaded, isClerkSignedIn, user]);

  const login = async () => {
    // Redirect logic handle by Clerk buttons usually
    window.location.href = '/login';
  };

  const logout = () => {
    // This will be handled by Clerk UserButton usually, 
    // but if called programmatically:
    setCurrentUser(null);
    setIsSignedIn(false);
  };

  const signup = async () => {
    window.location.href = '/signup';
  };

  const value = {
    currentUser,
    login,
    logout,
    signup,
    loading,
    isSignedIn,
    getToken: async () => await getToken()
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center font-exo">
        <div className="relative">
          <div className="w-24 h-24 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-8 text-blue-400 font-orbitron font-bold tracking-[4px] uppercase text-xs animate-pulse">Syncing Secure Engine</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
