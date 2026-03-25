import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from '../lib/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
         // Fetch extra data from Firestore if exists
         const userDoc = await getDoc(doc(db, "users", currentUser.uid));
         const userData = userDoc.exists() ? userDoc.data() : {};
         
         setUser({
           uid: currentUser.uid,
           email: currentUser.email,
           displayName: currentUser.displayName || userData.name || 'Student',
           phoneNumber: userData.mobile || '',
           ...userData
         });
      } else {
         setUser(null);
      }
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

  const signup = async (email, password, name, mobile) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Auth Profile
      await updateProfile(res.user, { displayName: name });

      // Save to Firestore for Admin Panel later
      await setDoc(doc(db, "users", res.user.uid), {
        name,
        mobile,
        email,
        uid: res.user.uid,
        createdAt: new Date().toISOString()
      });

      toast.success('Registration successful! Welcome to Aakash.');
      return res.user;
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
      const res = await signInWithPopup(auth, googleProvider);
      
      // Save Google User too if new
      await setDoc(doc(db, "users", res.user.uid), {
        name: res.user.displayName,
        email: res.user.email,
        uid: res.user.uid,
        createdAt: new Date().toISOString()
      }, { merge: true });

      toast.success('Google login successful!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
