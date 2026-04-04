import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const AppContext = createContext();

// Mock Data for Initial Development
const INITIAL_COURSES = [
  // Govt courses
  { id: 'g1', title: 'SSC CGL Complete Preparation', exam: 'GOVT EXAMS', category: 'govt', class: '', price: 2999, free: false, image: 'https://images.unsplash.com/photo-1546410531-bea4f4b6459d?w=400', faculty: 'Exam Expert' },
  { id: 'g2', title: 'SSC CHSL Coaching', exam: 'GOVT EXAMS', category: 'govt', class: '', price: 1999, free: false, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400', faculty: 'Exam Expert' },
  { id: 'g3', title: 'Railway Group D Prep', exam: 'GOVT EXAMS', category: 'govt', class: '', price: 1499, free: false, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400', faculty: 'Exam Expert' },
  { id: 'g4', title: 'Railway NTPC Complete Course', exam: 'GOVT EXAMS', category: 'govt', class: '', price: 1999, free: false, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400', faculty: 'Exam Expert' },
  { id: 'g5', title: 'DSSSB TGT/PGT Preparation', exam: 'GOVT EXAMS', category: 'govt', class: '', price: 2499, free: false, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400', faculty: 'Exam Expert' },
  { id: 'g6', title: 'UP Police Constable', exam: 'GOVT EXAMS', category: 'govt', class: '', price: 1499, free: false, image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400', faculty: 'Exam Expert' },
  { id: 'g7', title: 'Delhi Police Exam Prep', exam: 'GOVT EXAMS', category: 'govt', class: '', price: 1499, free: false, image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400', faculty: 'Exam Expert' },

  // School courses
  { id: 's1', title: 'Mathematics Class 9-10', exam: 'SCHOOL', category: 'school', class: '9, 10', tags: ['foundation'], price: 999, free: false, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400', faculty: 'Samanth J.' },
  { id: 's2', title: 'Science Class 9-10', exam: 'SCHOOL', category: 'school', class: '9, 10', price: 999, free: false, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', faculty: 'Dr. RK Singh' },
  { id: 's3', title: 'English Grammar & Writing', exam: 'SCHOOL', category: 'school', class: '6, 7, 8, 9, 10', price: 799, free: false, image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400', faculty: 'Aman Deep' },
  { id: 's4', title: 'Social Studies (SST)', exam: 'SCHOOL', category: 'school', class: '9, 10', price: 799, free: false, image: 'https://images.unsplash.com/photo-1522881113591-b6a9cc2989b6?w=400', faculty: 'Shilpa Rao' },
  { id: 's5', title: 'Hindi Class 6-8', exam: 'SCHOOL', category: 'school', class: '6, 7, 8', price: 0, free: true, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0d?w=400', faculty: 'Aman Deep' },
  { id: 's6', title: 'Foundation Course Class 6-8', exam: 'SCHOOL', category: 'school', class: '6, 7, 8', tags: ['foundation'], price: 1499, free: false, image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400', faculty: 'Samanth J.' },

  // Senior courses
  { id: 'sr1', title: 'Physics Class 11-12', exam: 'BOARDS', category: 'senior', class: '11, 12', price: 1499, free: false, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400', faculty: 'Dr. RK Singh' },
  { id: 'sr2', title: 'Chemistry Class 11-12', exam: 'BOARDS', category: 'senior', class: '11, 12', price: 1499, free: false, image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400', faculty: 'Aman Deep' },
  { id: 'sr3', title: 'Mathematics Class 11-12', exam: 'BOARDS', category: 'senior', class: '11, 12', price: 1499, free: false, image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400', faculty: 'Samanth J.' },
  { id: 'sr4', title: 'Biology Class 11-12', exam: 'BOARDS', category: 'senior', class: '11, 12', price: 1499, free: false, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', faculty: 'Shilpa Rao' },
  { id: 'sr5', title: 'Accountancy Class 11-12', exam: 'BOARDS', category: 'senior', class: '11, 12', price: 1299, free: false, image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400', faculty: 'Commerce Expert' },
  { id: 'sr6', title: 'Economics Class 11-12', exam: 'BOARDS', category: 'senior', class: '11, 12', price: 1299, free: false, image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400', faculty: 'Commerce Expert' },
  { id: 'sr7', title: 'Business Studies', exam: 'BOARDS', category: 'senior', class: '11, 12', price: 1299, free: false, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', faculty: 'Commerce Expert' },
  { id: 'sr8', title: 'History, Political Science', exam: 'BOARDS', category: 'senior', class: '11, 12', price: 1299, free: false, image: 'https://images.unsplash.com/photo-1510006263590-edc764e432a6?w=400', faculty: 'Humanities Expert' },

  // Coming soon (JEE/NEET) + CUET
  { id: 'c1', title: 'JEE Physics: Mechanics Masterclass', exam: 'JEE', category: 'jee', class: '12', status: 'coming_soon', price: 2999, free: false, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400', faculty: 'Dr. RK Singh' },
  { id: 'c2', title: 'NEET Biology: Genetic Basis', exam: 'NEET', category: 'neet', class: '12', status: 'coming_soon', price: 0, free: true, image: 'https://images.unsplash.com/photo-1579154273821-39691b0f5551?w=400', faculty: 'Shilpa Rao' },
  { id: 'c5', title: 'CUET 2026 Complete Prep', exam: 'CUET', category: 'cuet', class: '12', status: 'active', price: 2999, originalPrice: 8999, discount: '67%', newBatch: 'April 1, 2026', free: false, image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=400', faculty: 'Aakash Faculty', features: ['Domain Subjects', 'General Test', 'Language Section', 'Mock Tests Included'] },
];

const INITIAL_TESTS = [
  // Locked
  { id: 't1', title: 'Full JEE Mock Test 1', duration: 180, totalQuestions: 75, exam: 'JEE', category: 'jee', locked: true },
  { id: 't2', title: 'NEET Biology Chapter Test: Cell', duration: 30, totalQuestions: 45, exam: 'NEET', category: 'neet', locked: true },
  
  // Active
  { id: 't3', title: 'CLASS 10 MATHS FULL TEST', duration: 180, totalQuestions: 80, exam: 'BOARDS', category: 'school', tagBg: '#0D2240' },
  { id: 't4', title: 'CLASS 10 SCIENCE MOCK TEST', duration: 150, totalQuestions: 60, exam: 'BOARDS', category: 'school' },
  { id: 't5', title: 'CLASS 12 PHYSICS CHAPTER TEST', duration: 90, totalQuestions: 45, exam: 'SENIOR', category: 'senior' },
  { id: 't6', title: 'CLASS 12 ACCOUNTANCY MOCK', duration: 120, totalQuestions: 60, exam: 'COMMERCE', category: 'senior' },
  { id: 't7', title: 'SSC CGL FULL MOCK TEST 1', duration: 60, totalQuestions: 100, exam: 'GOVT JOBS', category: 'govt', tagBg: '#22C55E' },
  { id: 't8', title: 'RAILWAY NTPC MOCK TEST', duration: 90, totalQuestions: 100, exam: 'GOVT JOBS', category: 'govt' },
  { id: 't9', title: 'CUET 2026 FULL MOCK TEST', duration: 195, totalQuestions: 150, exam: 'CUET', category: 'cuet', tagBg: '#7C3AED', badge: '🆕 NEW', badgeBg: '#22C55E' },
  { id: 't10', title: 'CLASS 9 MATHS CHAPTER TEST', duration: 60, totalQuestions: 30, exam: 'SCHOOL', category: 'school' },
];

export const AppProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const user = currentUser; // Maintain internal 'user' alias for backward compatibility with existing functions
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
