// frontend/src/pages/LoginPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back');
    } catch {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 dark:bg-slate-900">
      <form
        onSubmit={submit}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-6 w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-brand-600">Login</h2>
        <input
          className="border rounded-lg p-2 w-full mb-3
                     bg-white text-slate-900 border-slate-300
                     dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                     focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
          placeholder="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border rounded-lg p-2 w-full mb-4
                     bg-white text-slate-900 border-slate-300
                     dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
                     focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full py-2 rounded-lg bg-brand-500 text-white hover:brightness-110 transition">
          Login
        </button>
      </form>
    </div>
  );
}
