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

  // NEW: Real SMS OTP via Fast2SMS (Wrapped in CORS Proxy for localhost + production support)
  const sendSmsOtp = async (phoneNumber) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveOtp(otp); 
    const FAST2SMS_KEY = "edH0Or9RZ7cxqBYbMNkPSaC251LUyQoE3VjuntlDi4XJKsGfvhImRVKqBJ1LGrcSEUiaXznjlNT79OwD";

    try {
        const smsUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_KEY}&route=q&message=Your Aakash Academics OTP is ${otp}. Valid for 5 minutes.&language=english&numbers=${phoneNumber}`;
        
        // Proxy URL
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(smsUrl)}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('CORS Proxy Server Error');
        
        const data = await response.json();
        
        if (!data || !data.contents) {
            throw new Error('Proxy returned empty response. Reload and try again.');
        }

        const parsedData = JSON.parse(data.contents);
        
        if (parsedData.return) {
            toast.success('OTP Sent Successfully!');
            return { success: true, otp }; 
        } else {
            // Show the exact reason from Fast2SMS (e.g. "Low Balance" or "Invalid Number")
            const reason = (parsedData.message && parsedData.message[0]) || parsedData.request_id || 'Fast2SMS Busy';
            throw new Error(`Fast2SMS Error: ${reason}`);
        }
    } catch (error) {
        console.error('OTP Sending Failed:', error);
        toast.error(error.message || 'OTP nahi bhej paye. Network/Balance check karein.');
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
