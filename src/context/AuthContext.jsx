import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Listen to Firebase Auth changes (Much faster/reliable than Supabase persistent sessions)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("[Firebase] Session detected for:", user.email);
        try {
          // 2. Fetch full profile from Supabase using Firebase UID as the key
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.uid)
            .maybeSingle();

          if (profileError) throw profileError;

          // Merge Firebase global user with Supabase localized profile info
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
      
      // Fetch profile immediately after login to prevent UI delay
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', result.user.uid)
        .maybeSingle();

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
      
      // Link with Supabase Profile
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: result.user.uid,
        email: email,
        name: name,
        role: 'student'
      });
      
      if (profileError) console.error("Supabase profile sync error:", profileError);
      
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

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
