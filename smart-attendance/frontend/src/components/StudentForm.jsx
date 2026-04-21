// frontend/src/components/StudentForm.jsx
import { useEffect, useState } from 'react';
import WebcamCapture from './WebcamCapture.jsx';
import api from '../services/api.js';
import toast from 'react-hot-toast';

export default function StudentForm({ onClose, onCreated }) {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ name: '', rollNo: '', classId: '' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    api.listClasses().then(({ data }) => setClasses(data));
  }, []);

  const submit = async () => {
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('rollNo', form.rollNo);
      fd.append('classId', form.classId);
      if (image) {
        const blob = await (await fetch(image)).blob();
        fd.append('image', blob, 'face.png');
      }
      const { data } = await api.createStudent(fd);
      toast.success('Student added');
      onCreated?.(data);
      onClose?.();
    } catch {
      toast.error('Failed to add student');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          className="border rounded-lg p-2 w-full
                     bg-white text-slate-900 border-slate-300
                     dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                     focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border rounded-lg p-2 w-full
                     bg-white text-slate-900 border-slate-300
                     dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                     focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
          placeholder="Roll No"
          value={form.rollNo}
          onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
        />
        <select
          className="border rounded-lg p-2 w-full sm:col-span-2
                     bg-white text-slate-900 border-slate-300
                     dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                     focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
          value={form.classId}
          onChange={(e) => setForm({ ...form, classId: e.target.value })}
        >
          <option value="">Select class</option>
          {classes.map((c) => (
            <option
              key={c._id}
              value={c._id}
              className="bg-white dark:bg-slate-900"
            >
              {c.name} {c.section} - {c.subject}
            </option>
          ))}
        </select>
      </div>

      <WebcamCapture onCapture={setImage} />

      {image && (
        <div className="mt-3">
          <p className="text-sm text-slate-500 dark:text-slate-400">Captured Preview:</p>
          <img src={image} alt="Captured face" className="rounded-lg border max-w-xs" />
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={submit}
          className="px-4 py-2 rounded-lg bg-accent-500 text-white hover:brightness-110 transition"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
