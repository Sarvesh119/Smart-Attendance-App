// frontend/src/components/ClassForm.jsx
import { useState } from 'react';
import api from '../services/api.js';
import toast from 'react-hot-toast';

export default function ClassForm({ onClose, onCreated }) {
  const [form, setForm] = useState({ name: '', section: '', subject: '' });

  const submit = async () => {
    try {
      const { data } = await api.createClass(form);
      toast.success('Class created');
      onCreated?.(data);
      onClose?.();
    } catch {
      toast.error('Failed to create class');
    }
  };

  return (
    <div className="p-4 space-y-3">
      <input
        className="border rounded-lg p-2 w-full
                   bg-white text-slate-900 border-slate-300
                   dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                   focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
        placeholder="Class name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border rounded-lg p-2 w-full
                   bg-white text-slate-900 border-slate-300
                   dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                   focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
        placeholder="Section"
        value={form.section}
        onChange={(e) => setForm({ ...form, section: e.target.value })}
      />
      <input
        className="border rounded-lg p-2 w-full
                   bg-white text-slate-900 border-slate-300
                   dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                   focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <div className="flex gap-2">
        <button
          onClick={submit}
          className="px-4 py-2 rounded-lg bg-brand-500 text-white hover:brightness-110 transition"
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
