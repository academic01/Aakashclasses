import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const AppContext = createContext();

// Mock Data for Initial Development
const INITIAL_COURSES = [
  { id: 'c1', title: 'JEE Physics: Mechanics Masterclass', exam: 'JEE', class: '12', price: 2999, free: false, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400', faculty: 'Dr. RK Singh' },
  { id: 'c2', title: 'NEET Biology: Genetic Basis', exam: 'NEET', class: '12', price: 0, free: true, image: 'https://images.unsplash.com/photo-1579154273821-39691b0f5551?auto=format&fit=crop&q=80&w=400', faculty: 'Shilpa Rao' },
  { id: 'c3', title: 'Foundation Mathematics: Algebra', exam: 'BOARDS', class: '10', price: 1499, free: false, image: 'https://images.unsplash.com/photo-1543286386-2167bb309eb2?auto=format&fit=crop&q=80&w=400', faculty: 'Samanth J.' },
  { id: 'c4', title: 'Advanced Chemistry: Organic', exam: 'JEE', class: '12', price: 0, free: true, image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=400', faculty: 'Aman Deep' },
  { id: 'c5', title: 'CUET 2026 Complete Prep', exam: 'CUET', class: '12', price: 2999, originalPrice: 8999, discount: '67%', newBatch: 'April 1, 2026', free: false, image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=400', faculty: 'Aakash Faculty', features: ['Domain Subjects', 'General Test', 'Language Section', 'Mock Tests Included'] },
];

const INITIAL_TESTS = [
  { id: 't1', title: 'Full JEE Mock Test 1', duration: 180, totalQuestions: 75, exam: 'JEE', premium: true },
  { id: 't2', title: 'NEET Biology Chapter Test: Cell', duration: 30, totalQuestions: 45, exam: 'NEET', premium: false },
  { id: 't3', title: 'Board Exam Pattern: Math Class 10', duration: 120, totalQuestions: 38, exam: 'BOARDS', premium: false },
];

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [courses] = useState(INITIAL_COURSES);
  const [tests] = useState(INITIAL_TESTS);
  const [userEnrollments, setUserEnrollments] = useState([]);
  const [filters, setFilters] = useState({ exam: '', class: '', type: 'all' });
  const [notifications, setNotifications] = useState([]);

  // Mock persistence (LocalStorage)
  useEffect(() => {
    const saved = localStorage.getItem('user_enrollments');
    if (saved) setUserEnrollments(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('user_enrollments', JSON.stringify(userEnrollments));
  }, [userEnrollments]);

  const enrollInCourse = async (courseId) => {
    if (!user) {
      toast.error('Please login to enroll');
      return false;
    }
    
    if (userEnrollments.includes(courseId)) {
      toast.error('Already enrolled!');
      return true;
    }

    const course = courses.find(c => c.id === courseId);
    
    if (course.free) {
      setUserEnrollments(prev => [...prev, courseId]);
      toast.success('Enrolled Successfully! Go to Dashboard');
      return true;
    } else {
      // Mock Payment Trigger (Razorpay Logic later)
      return { paymentRequired: true, price: course.price };
    }
  };

  const processPayment = async (courseId, paymentDetails) => {
    // Mock successful payment
    setUserEnrollments(prev => [...prev, courseId]);
    toast.success('Purchase Successful! Welcome to the course.');
    return true;
  };

  const clearFilters = () => setFilters({ exam: '', class: '', type: 'all' });

  return (
    <AppContext.Provider value={{ 
      courses, 
      tests, 
      userEnrollments, 
      filters, 
      setFilters, 
      enrollInCourse, 
      processPayment,
      clearFilters,
      notifications
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
