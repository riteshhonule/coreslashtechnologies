import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function AdminLayout() {
  const location = useLocation();
  const token = localStorage.getItem('admin_token');

  // If not logged in and trying to access anything other than login, redirect to login
  if (!token && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />;
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (token && location.pathname === '/admin/login') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Helmet>
        <title>Super Admin Panel | CoreSlash</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {/* Simple Topbar for logged in users */}
      {token && (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl">
              C
            </div>
            <span className="font-bold text-lg text-slate-800">Super Admin Panel</span>
          </div>
          
          <button 
            onClick={() => {
              localStorage.removeItem('admin_token');
              window.location.href = '/admin/login';
            }}
            className="text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors"
          >
            Sign Out
          </button>
        </header>
      )}

      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
