import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useClerk, useAuth as useClerkAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { sessionId } = useClerkAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        // Map Clerk user to your app's user shape
        const mappedUser = {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress || '',
          name: user.fullName || user.firstName || 'User',
          role: user.unsafeMetadata?.role || (user.primaryEmailAddress?.emailAddress === 'aakashacademics01@gmail.com' ? 'admin' : 'student'),
          imageUrl: user.imageUrl
        };
        setCurrentUser(mappedUser);
      } else {
        setCurrentUser(null);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  const logout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };


  const value = {
    currentUser,
    logout,
    login: () => window.location.href = '/login',
    signup: () => window.location.href = '/signup',
    loading: !isLoaded,
    isSignedIn
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center font-exo">
        <div className="relative">
          <div className="w-24 h-24 border-b-4 border-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center">
            <img src="/aakashlogo.png" alt="Aakash Logo" className="h-10 w-auto opacity-50 animate-pulse" />
          </div>
        </div>
        <p className="mt-8 text-blue-400 font-orbitron font-bold tracking-[4px] uppercase text-xs animate-pulse">Syncing Portal Engine</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
