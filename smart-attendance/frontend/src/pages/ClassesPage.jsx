// frontend/src/pages/ClassesPage.jsx
import { useEffect, useState } from 'react';
import api from '../services/api.js';
import ClassForm from '../components/ClassForm.jsx';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard.jsx';
import AnimatedButton from '../components/AnimatedButton.jsx';
import PageTransition from '../components/PageTransition.jsx';

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const { data } = await api.listClasses();
    setClasses(data);
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    try {
      await api.deleteClass(id);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <PageTransition>
      <div className="space-y-4">
        <AnimatedButton onClick={() => setShowForm(true)}>Add Class</AnimatedButton>

        <GlassCard className="p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Section</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Teacher</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c._id} className="border-t hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.section}</td>
                  <td className="p-2">{c.subject}</td>
                  <td className="p-2">{c.teacher?.name}</td>
                  <td className="p-2">
                    <button
                      onClick={() => del(c._id)}
                      className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg sm:max-w-xl overflow-y-auto max-h-[90vh]"
              >
                <ClassForm onClose={() => setShowForm(false)} onCreated={() => load()} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
