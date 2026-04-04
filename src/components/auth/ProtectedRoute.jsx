import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-lightBg1"><div className="w-12 h-12 border-4 border-brandNavy border-t-brandBlue rounded-full animate-spin"></div></div>;
  }

  if (!currentUser) {
    return <Navigate to="/portal-login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to their respective dashboard if they try to access wrong route
    if (currentUser.role === 'admin') return <Navigate to="/admin" replace />;
    if (currentUser.role === 'teacher') return <Navigate to="/teacher-offline" replace />;
    if (currentUser.role === 'student') return <Navigate to="/student-offline" replace />;
    return <Navigate to="/" replace />; // Fallback
  }

  return <Outlet />;
};

export default ProtectedRoute;
