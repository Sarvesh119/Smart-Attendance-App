import { motion } from 'framer-motion';

export default function AttendanceTable({ records }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 overflow-x-auto border border-slate-200 dark:border-slate-700">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b border-slate-200 dark:border-slate-700">
            <th className="p-2 text-slate-700 dark:text-slate-300">Student</th>
            <th className="p-2 text-slate-700 dark:text-slate-300">Roll No</th>
            <th className="p-2 text-slate-700 dark:text-slate-300">Class</th>
            <th className="p-2 text-slate-700 dark:text-slate-300">Date</th>
            <th className="p-2 text-slate-700 dark:text-slate-300">Status</th>
            <th className="p-2 text-slate-700 dark:text-slate-300">Time</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <motion.tr
              key={r._id || idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
            >
              <td className="p-2 text-slate-900 dark:text-slate-100">{r.student?.name || 'N/A'}</td>
              <td className="p-2 text-slate-900 dark:text-slate-100">{r.student?.rollNo || 'N/A'}</td>
              <td className="p-2 text-slate-900 dark:text-slate-100">{`${r.class?.name || ''} ${r.class?.section || ''}`.trim() || 'N/A'}</td>
              <td className="p-2 text-slate-900 dark:text-slate-100">{r.date || 'N/A'}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    r.status === 'present'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                      : r.status === 'absent'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  {r.status ? r.status.charAt(0).toUpperCase() + r.status.slice(1) : 'Unknown'}
                </span>
              </td>
              <td className="p-2 text-slate-900 dark:text-slate-100">
                {r.time ? new Date(r.time).toLocaleTimeString() : 'N/A'}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      {records.length === 0 && (
        <div className="text-center text-slate-500 dark:text-slate-400 py-6">
          No attendance records found. Select a class and click Load.
        </div>
      )}
    </div>
  );
}
