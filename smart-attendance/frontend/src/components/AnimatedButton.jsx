import { motion } from 'framer-motion';

export default function AnimatedButton({ children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`px-4 py-2 rounded-xl bg-brand-500 text-white shadow-soft hover:shadow-lg transition ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
