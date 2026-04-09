import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            setCurrentUser(data);
            setIsSignedIn(true);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error("Auth verification failed", error);
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setCurrentUser({ id: data._id, name: data.name, email: data.email, role: data.role });
        setIsSignedIn(true);
        toast.success("Logged in successfully");
        return true;
      } else {
        toast.error(data.message || "Login failed");
        return false;
      }
    } catch (err) {
      toast.error("Network error");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsSignedIn(false);
    toast.success("Logged out successfully");
    window.location.href = '/login';
  };

  const signup = async (name, email, password, phone) => {
     try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setCurrentUser({ id: data._id, name: data.name, email: data.email, role: data.role });
        setIsSignedIn(true);
        toast.success("Registered successfully");
        return true;
      } else {
        toast.error(data.message || "Registration failed");
        return false;
      }
    } catch (err) {
      toast.error("Network error");
      return false;
    }
  }

  const value = {
    currentUser,
    login,
    logout,
    signup,
    loading,
    isSignedIn,
    getToken: () => localStorage.getItem('token')
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
