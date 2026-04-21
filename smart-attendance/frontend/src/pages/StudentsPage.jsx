// frontend/src/pages/StudentsPage.jsx
import { useEffect, useState } from 'react';
import api from '../services/api.js';
import StudentForm from '../components/StudentForm.jsx';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState('');
  const [classId, setClassId] = useState('');
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const { data } = await api.listStudents({ search: q, classId, limit: 100 });
    setStudents(data.students);
  };

  useEffect(() => {
    api.listClasses().then(({ data }) => setClasses(data));
    load();
  }, [q, classId]);

  const del = async (id) => {
    try {
      await api.deleteStudent(id);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <input
          className="border rounded-lg p-2 flex-1 min-w-[150px]
                     bg-white text-slate-900 border-slate-300
                     dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                     focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded-lg p-2 flex-1 min-w-[150px]
                     bg-white text-slate-900 border-slate-300
                     dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                     focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        >
          <option value="">All classes</option>
          {classes.map((c) => (
            <option
              key={c._id}
              value={c._id}
              className="bg-white dark:bg-slate-900"
            >
              {c.name} {c.section}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded-lg bg-brand-500 text-white hover:brightness-110 transition"
        >
          Add Student
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-2 text-slate-700 dark:text-slate-300">Name</th>
              <th className="p-2 text-slate-700 dark:text-slate-300">Roll No</th>
              <th className="p-2 text-slate-700 dark:text-slate-300">Class</th>
              <th className="p-2 text-slate-700 dark:text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s._id}
                className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
              >
                <td className="p-2 text-slate-900 dark:text-slate-100">{s.name}</td>
                <td className="p-2 text-slate-900 dark:text-slate-100">{s.rollNo}</td>
                <td className="p-2 text-slate-900 dark:text-slate-100">
                  {s.classId?.name} {s.classId?.section}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => del(s._id)}
                    className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg sm:max-w-2xl overflow-y-auto max-h-[90vh]"
            >
              <StudentForm onClose={() => setShowForm(false)} onCreated={() => load()} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
