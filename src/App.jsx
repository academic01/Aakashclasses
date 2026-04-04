import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CoursesPage from './pages/CoursesPage';
import LivePage from './pages/LivePage';
import TestSeriesPage from './pages/TestSeriesPage';
import PricingPage from './pages/PricingPage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardPage from './pages/DashboardPage';
import GoalSelectionPage from './pages/GoalSelectionPage';
import AboutUs from './pages/AboutUs';
import ContactSupport from './pages/ContactSupport';
import Careers from './pages/Careers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import SyllabusPage from './pages/SyllabusPage';
import CuetPage from './pages/CuetPage';

import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PortalLogin from './pages/PortalLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentDashboard from './pages/student/StudentDashboard';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-lightBg1 text-textPrimary relative overflow-hidden">
        {/* Subtle Depth Blobs */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-black/[0.04] blur-[150px]"></div>
          <div className="absolute top-[30%] right-[-15%] w-[40%] h-[60%] rounded-full bg-black/[0.03] blur-[150px]"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] rounded-full bg-black/[0.02] blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-0 mt-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/cuet" element={<CuetPage />} />
              <Route path="/live" element={<LivePage />} />
              <Route path="/test-series" element={<TestSeriesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/login" element={<AuthPage type="login" />} />
              <Route path="/signup" element={<AuthPage type="signup" />} />
              <Route path="/goal-selection" element={<GoalSelectionPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactSupport />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/syllabus" element={<SyllabusPage />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              
              {/* Portal Routes */}
              <Route path="/portal-login" element={<PortalLogin />} />
              <Route path="/login-portal" element={<Navigate to="/portal-login" replace />} />
              
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
              
              <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
                <Route path="/teacher-offline" element={<TeacherDashboard />} />
              </Route>
              
              <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                <Route path="/student-offline" element={<StudentDashboard />} />
              </Route>

              {/* Stub for other routes */}
              <Route path="*" element={<div className="flex flex-col items-center justify-center py-48 text-center bg-white"><h2 className="text-4xl font-orbitron font-bold text-brandNavy uppercase mb-4">Coming Soon...</h2><p className="text-textMuted font-exo font-semibold mb-8">We are building something magical for you.</p><a href="/" className="btn-primary px-10 py-3">Back to Homepage</a></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
