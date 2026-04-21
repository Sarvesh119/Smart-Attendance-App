import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`bg-white/80 dark:bg-slate-800/70 backdrop-blur rounded-2xl shadow-soft border border-slate-200/60 dark:border-slate-700 ${className}`}
    >
      {children}
    </motion.div>
  );
}
