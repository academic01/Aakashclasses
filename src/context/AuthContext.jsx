import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from '../lib/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Using Fast2SMS now for Real SMS OTP
const MOCK_AUTH = false; 
const FAST2SMS_KEY = "edH0Or9RZ7cxqBYbMNkPSaC251LUyQoE3VjuntlDi4XJKsGfvhImRVKqBJ1LGrcSEUiaXznjlNT79OwD";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeOtp, setActiveOtp] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Google login successful!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // NEW: Real SMS OTP via Fast2SMS (proxied through Vercel API to avoid CORS)
  const sendSmsOtp = async (phoneNumber) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveOtp(otp); 

    try {
        const response = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: phoneNumber, otp })
        });
        
        const data = await response.json();
        
        if (data.return) {
            toast.success('OTP Sent Successfully!');
            return { success: true, otp }; 
        } else {
            throw new Error(data.message || 'Failed to send SMS');
        }
    } catch (error) {
        console.error('API Error:', error);
        toast.error('CORS Error Bypass: Serverless function failed.');
        throw error;
    }
  };

  const verifySmsOtp = async (enteredOtp, phone) => {
    if (activeOtp && enteredOtp === activeOtp) {
       // On success, we manually log them in or set user state
       // In a real app, you'd create/fetch the user in Firestore here
       setUser({
         phoneNumber: phone,
         uid: 'sms-' + phone,
         displayName: 'User ' + phone.slice(-4)
       });
       setActiveOtp(null);
       return true;
    }
    throw new Error('Ghalat OTP hai bhai!');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, loginWithGoogle, sendSmsOtp, verifySmsOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
