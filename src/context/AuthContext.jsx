import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabaseDB } from '../lib/supabaseDB';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
          setCurrentUser(profile || { id: session.user.id, role: 'student' });
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();
        setCurrentUser(profile || { id: session.user.id, role: 'student' });
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    console.log("[Auth] Attempting login for email:", email);
    try {
      const loginPromise = (async () => {
        console.log("[Auth] Calling supabaseDB.login...");
        const user = await supabaseDB.login(email.trim(), password.trim());
        console.log("[Auth] supabaseDB.login response received:", !!user);
        return user;
      })();

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Supabase internal connection timeout. Verify Vercel Env Vars.")), 15000)
      );

      const user = await Promise.race([loginPromise, timeoutPromise]);
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error("[Auth] CRITICAL LOGIN ERROR:", error);
      toast.error(error.message || "Authentication system failure.");
      throw error;
    }
  };

  const signup = async (email, password, name, mobile) => {
    try {
      const user = await supabaseDB.signup(email, password, name, mobile);
      toast.success("Account created! Check your email if verification is required.");
      return user;
    } catch (error) {
      toast.error(error.message || "Signup failed");
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      await supabaseDB.loginWithGoogle();
    } catch (error) {
      toast.error(error.message || "Google login failed");
      throw error;
    }
  };

  const logout = async () => {
    await supabaseDB.logout();
    setCurrentUser(null);
    toast.success("Logged out successfully");
  };

  const value = {
    currentUser,
    login,
    signup,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
