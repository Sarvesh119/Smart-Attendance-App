import { useEffect, useState, useMemo } from "react";
import api from "../services/api.js";
import AttendanceTable from "../components/AttendanceTable.jsx";
import GlassCard from "../components/GlassCard.jsx";
import AnimatedButton from "../components/AnimatedButton.jsx";
import PageTransition from "../components/PageTransition.jsx";

function toCSV(records) {
  const header = ["Student", "Roll No", "Class", "Date", "Status", "Time"].join(",");
  const rows = records.map((r) =>
    [
      r.student?.name || "",
      r.student?.rollNo || "",
      `${r.class?.name || ""} ${r.class?.section || ""}`.trim(),
      r.date || "",
      r.status || "",
      r.time ? new Date(r.time).toISOString() : "",
    ].join(",")
  );
  return [header, ...rows].join("\n");
}

export default function AttendancePage() {
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.listClasses().then(({ data }) => {
      console.log('✅ Classes loaded:', data);
      setClasses(data);
    }).catch(err => {
      console.error('❌ Classes load failed:', err);
    });
  }, []);

  const load = async () => {
    if (!classId) {
      alert("Please select a class first");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const params = {};
      if (from) params.from = from;
      if (to) params.to = to;
      
      console.log('🔄 Loading attendance...');
      console.log('📍 Class ID:', classId);
      console.log('📅 Params:', params);
      
      const response = await api.attendanceByClass(classId, params);
      console.log('✅ API Response:', response.data);
      
      setRecords(response.data);
    } catch (error) {
      console.error('❌ Full Error Object:', error);
      console.error('❌ Error Response:', error.response?.data);
      console.error('❌ Error Status:', error.response?.status);
      
      const errorMsg = error.response?.data?.message || 
                      error.response?.statusText || 
                      error.message || 
                      'Unknown error occurred';
      
      setError(errorMsg);
      alert(`Failed to load attendance: ${errorMsg}\n\nCheck console for details`);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    if (records.length === 0) {
      alert("No records to export");
      return;
    }
    const csv = toCSV(records);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_${classId}_${from || new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const summary = useMemo(() => {
    const present = records.filter((r) => r.status === "present").length;
    const absent = records.filter((r) => r.status === "absent").length;
    return { present, absent, total: records.length };
  }, [records]);

  return (
    <PageTransition>
      <div className="space-y-4">
        <GlassCard className="p-4 flex flex-wrap gap-2 items-end">
          <select
            className="border rounded-lg p-2 min-w-[180px] bg-white text-slate-900 border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} {c.section}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border rounded-lg p-2 bg-white text-slate-900 border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            max={to || new Date().toISOString().slice(0,10)}
          />

          <input
            type="date"
            className="border rounded-lg p-2 bg-white text-slate-900 border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            min={from}
          />

          <AnimatedButton onClick={load} disabled={loading || !classId}>
            {loading ? "Loading..." : "Load"}
          </AnimatedButton>
          <AnimatedButton className="bg-accent-500" onClick={exportCSV} disabled={records.length === 0}>
            Export CSV
          </AnimatedButton>
        </GlassCard>

        {error && (
          <GlassCard className="p-4 bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-200">
            <strong>❌ Error:</strong> {error}
          </GlassCard>
        )}

        <AttendanceTable records={records} />

        {records.length > 0 && (
          <GlassCard className="p-4 flex gap-6 text-sm font-medium">
            <span className="text-green-600">Present: {summary.present}</span>
            <span className="text-red-500">Absent: {summary.absent}</span>
            <span className="text-slate-700 dark:text-slate-300">Total: {summary.total}</span>
          </GlassCard>
        )}
      </div>
    </PageTransition>
  );
}
