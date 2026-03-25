import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useAuth as useClerkAuth, useClerk } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isLoaded: userLoaded, user: clerkUser } = useUser();
  const { isLoaded: authLoaded, signOut } = useClerkAuth();
  const { openSignIn } = useClerk();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLoaded && authLoaded) {
      if (clerkUser) {
        setUser({
          email: clerkUser.primaryEmailAddress?.emailAddress,
          displayName: clerkUser.fullName || clerkUser.firstName || 'User',
          uid: clerkUser.id,
          photoURL: clerkUser.imageUrl
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [userLoaded, authLoaded, clerkUser]);

  const login = async () => {
    openSignIn();
  };

  const logout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginWithGoogle = async () => {
    openSignIn({ initialValues: { strategy: 'oauth_google' } });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
