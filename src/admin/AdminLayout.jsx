import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Video, FileText, Calendar, CreditCard, UserCheck, Tag, Bell, Settings, PieChart, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Videos', path: '/admin/videos', icon: Video },
    { name: 'Test Series', path: '/admin/tests', icon: FileText },
    { name: 'Live Classes', path: '/admin/live', icon: Calendar },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Faculty', path: '/admin/faculty', icon: UserCheck },
    { name: 'Coupons', path: '/admin/coupons', icon: Tag },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
    { name: 'Analytics', path: '/admin/analytics', icon: PieChart },
  ];

  const handleLogout = () => {
    // Handle auth removal here
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-gray-900 font-inter">
      {/* Sidebar */}
      <aside className={`\${isSidebarOpen ? 'w-[260px]' : 'w-[80px]'} flex-shrink-0 bg-[#0D2240] text-white transition-all duration-300 flex flex-col h-full overflow-y-auto hidden md:flex`}>
        <div className="p-4 flex items-center justify-center border-b border-white/10 sticky top-0 bg-[#0D2240] z-10">
          <Link to="/admin" className="font-bold text-xl text-white tracking-widest flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-[#F5A623] text-[#0D2240] flex items-center justify-center">A</span>
            {isSidebarOpen && <span>AAKASH</span>}
          </Link>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors \${isActive ? 'bg-[#F5A623] text-[#0D2240] font-semibold' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                title={link.name}
              >
                <Icon size={20} />
                {isSidebarOpen && <span className="whitespace-nowrap">{link.name}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-white/10 mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-[70px] bg-white border-b px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <h1 className="font-bold text-xl capitalize">{location.pathname === '/admin' ? 'Dashboard' : location.pathname.split('/admin/')[1].replace('-', ' ')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-4 border-l">
              <div className="w-8 h-8 rounded-full bg-[#0D2240] text-white flex items-center justify-center font-bold text-sm">A</div>
              <span className="font-medium text-sm hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F8F9FA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
