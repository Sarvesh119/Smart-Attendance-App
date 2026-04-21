import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import StudentsPage from './pages/StudentsPage.jsx';
import ClassesPage from './pages/ClassesPage.jsx';
import AttendancePage from './pages/AttendancePage.jsx';
import LiveAttendancePage from './pages/LiveAttendancePage.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';

function ProtectedLayout({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: '12px', background: '#111827', color: '#fff' },
          success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
      <Route path="/students" element={<ProtectedLayout><StudentsPage /></ProtectedLayout>} />
      <Route path="/classes" element={<ProtectedLayout><ClassesPage /></ProtectedLayout>} />
      <Route path="/attendance" element={<ProtectedLayout><AttendancePage /></ProtectedLayout>} />
      <Route path="/live" element={<ProtectedLayout><LiveAttendancePage /></ProtectedLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
