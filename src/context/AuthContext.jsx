import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { firebaseDB } from '../lib/firebaseDB';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Listen to Firebase Auth changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("[Firebase] Session detected for:", user.email);
        try {
          // 2. Fetch profile from Firestore
          let profile = await firebaseDB.getProfile(user.uid);

          // AUTO-PROVISIONING logic for Admin
          if (!profile && user.email === 'aakashacademics01@gmail.com') {
            const adminProfile = {
              id: user.uid,
              email: user.email,
              name: "Aakash Admin",
              role: 'admin',
              createdAt: serverTimestamp()
            };
            await setDoc(doc(db, 'profiles', user.uid), adminProfile);
            profile = adminProfile;
            toast.success("Welcome back, Chief!");
          }

          // Merge Firebase global user with Firestore profile info
          setCurrentUser(profile || { 
            id: user.uid, 
            email: user.email, 
            role: 'student', 
            name: user.displayName || 'User' 
          });
        } catch (err) {
          console.error("Auth sync error:", err);
          setCurrentUser({ id: user.uid, email: user.email, role: 'student' });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    console.log("[Firebase] Attempting login for:", email);
    try {
      const result = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      console.log("[Firebase] Success!");
      
      // Fetch profile immediately after login
      const profile = await firebaseDB.getProfile(result.user.uid);
      const userData = profile || { id: result.user.uid, role: 'student' };
      setCurrentUser(userData);
      return userData;
    } catch (error) {
      console.error("[Firebase] Error:", error.code);
      let msg = "Invalid credentials. Please try again.";
      if (error.code === 'auth/user-not-found') msg = "User not found. Please sign up.";
      if (error.code === 'auth/wrong-password') msg = "Incorrect password.";
      
      toast.error(msg);
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      
      // Create Firestore Profile
      const profileData = {
        id: result.user.uid,
        email: email,
        name: name,
        role: 'student',
        createdAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'profiles', result.user.uid), profileData);
      
      toast.success("Account created successfully!");
      return result.user;
    } catch (error) {
      toast.error(error.message || "Signup failed");
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    toast.success("Logged out successfully");
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  if (loading) {
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
