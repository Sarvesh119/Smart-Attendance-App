// frontend/src/components/Navbar.jsx
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiLogOut } from "react-icons/fi"; // door/exit icon

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-40 border-b backdrop-blur transition-colors duration-500
        ${scrolled ? 'bg-white/90 dark:bg-slate-900/80 shadow-md' : 'bg-white/70 dark:bg-slate-900/60'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        
        {/* Logo + Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="h-10 w-10 rounded-lg bg-brand-500 grid place-items-center shadow-sm">
            <span className="text-white font-semibold">SA</span>
          </div>
          <h1 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100">
            Smart Attendance
          </h1>
        </motion.div>

        {/* Right section */}
        <motion.div
          className="flex items-center gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* New ThemeToggle */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ThemeToggle />
          </motion.div>

          <motion.span
            className="hidden sm:block text-sm text-slate-600 dark:text-slate-300"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {user?.name} ({user?.role})
          </motion.span>

          {/* Logout button with door icon */}
          <motion.button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white font-medium 
                       shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 
                       focus:ring-red-400 transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
}
