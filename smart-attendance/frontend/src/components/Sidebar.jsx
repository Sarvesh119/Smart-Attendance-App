// frontend/src/components/Sidebar.jsx - CLEAN VERSION
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* Hamburger / Close button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 m-2 rounded-md bg-brand-500 text-white md:hidden relative w-10 h-10 flex items-center justify-center"
      >
        <span
          className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out
            ${open ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}
        />
        <span
          className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out
            ${open ? 'opacity-0' : 'opacity-100'}`}
        />
        <span
          className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out
            ${open ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}
        />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 min-h-screen w-64
                    bg-white dark:bg-slate-800 shadow-lg md:shadow-none
                    transform transition-transform duration-300 ease-in-out
                    ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
            📊 Dashboard
          </Link>
          <Link to="/students" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
            👥 Students
          </Link>
          <Link to="/classes" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
            📚 Classes
          </Link>
          <Link to="/attendance" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
            📈 Attendance Report
          </Link>
          <Link to="/live" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
            🎥 Live Attendance
          </Link>
        </nav>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 md:hidden transition-opacity duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      />
    </div>
  );
}
