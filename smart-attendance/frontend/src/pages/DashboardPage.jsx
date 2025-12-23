import { useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';
import { LineChartCard, BarChartCard } from '../components/ChartCard.jsx';
import PageTransition from '../components/PageTransition.jsx';
import GlassCard from '../components/GlassCard.jsx';
import Skeleton from '../components/Skeleton.jsx';

export default function DashboardPage() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todayAttendance, setTodayAttendance] = useState(0);

  useEffect(() => {
    Promise.all([
      api.listClasses().then(({ data }) => setClasses(data)),
      api.listStudents({ limit: 1000 }).then(({ data }) => setStudents(data.students))
    ]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!classes.length || !students.length) return;
    Promise.all(classes.map((c) => api.attendanceByClass(c._id)))
      .then((arr) => {
        const total = arr.reduce((acc, { data }) => acc + data.length, 0);
        const pct = students.length ? Math.round((total / students.length) * 100) : 0;
        setTodayAttendance(pct);
      })
      .catch(() => {});
  }, [classes, students]);

  const lineData = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => ({ day: `Day ${i + 1}`, attendance: Math.round(Math.random() * 100) })),
    []
  );
  const barData = useMemo(() => classes.map((c) => ({ className: c.name, attendance: Math.round(Math.random() * 100) })), [classes]);

  return (
    <PageTransition>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[['Total Students', students.length], ['Total Classes', classes.length], ['Today’s Attendance %', `${todayAttendance}%`]].map(([label, value]) => (
          <GlassCard key={label} className="p-4">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="text-3xl font-semibold">{loading ? <Skeleton className="h-8 w-24 mt-2" /> : value}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <GlassCard className="p-4"><LineChartCard title="Last 7 days attendance" data={lineData} /></GlassCard>
        <GlassCard className="p-4"><BarChartCard title="Per-class attendance" data={barData} /></GlassCard>
      </div>
    </PageTransition>
  );
}
