import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { auth, googleProvider } from '../lib/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// SET TO TRUE FOR INSTANT DEMO WITHOUT FIREBASE BILLING ERRORS
const MOCK_AUTH = true; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (MOCK_AUTH) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (MOCK_AUTH) {
      setUser({ email, uid: 'mock-123', displayName: 'Rahul K.' });
      toast.success('Login Successful (Mock)');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    if (MOCK_AUTH) {
      setUser({ email, uid: 'mock-123', displayName: name });
      toast.success('Account Created (Mock)');
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // You can update profile name here with updateProfile(res.user, { displayName: name })
      toast.success('Sign up successful!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    if (MOCK_AUTH) {
      setUser(null);
      toast.success('Logged out');
      return;
    }
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginWithGoogle = async () => {
    if (MOCK_AUTH) {
      setUser({ email: 'google@user.com', uid: 'google-123', displayName: 'Google User' });
      toast.success('Google Login Successful (Mock)');
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Google login successful!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setupRecaptcha = (phoneNumber) => {
    if (MOCK_AUTH) {
      return Promise.resolve({ confirm: () => Promise.resolve(true) });
    }
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
       size: 'invisible'
    });
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, loginWithGoogle, setupRecaptcha }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
