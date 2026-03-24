import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-textPrimary relative overflow-hidden">
        {/* Subtle Depth Blobs */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-black/[0.04] blur-[150px]"></div>
          <div className="absolute top-[30%] right-[-15%] w-[40%] h-[60%] rounded-full bg-black/[0.03] blur-[150px]"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] rounded-full bg-black/[0.02] blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Stub for other routes */}
              <Route path="*" element={<div className="text-center py-32 text-2xl font-orbitron text-textPrimary">Coming Soon...</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
