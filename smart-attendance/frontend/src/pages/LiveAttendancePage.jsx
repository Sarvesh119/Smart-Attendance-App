// frontend/src/pages/LiveAttendancePage.jsx - ✅ JSX FIXED
import { useEffect, useState } from 'react';
import api from '../services/api.js';
import WebcamCapture from '../components/WebcamCapture.jsx';
import GlassCard from '../components/GlassCard.jsx';
import AnimatedButton from '../components/AnimatedButton.jsx';
import PageTransition from '../components/PageTransition.jsx';
import toast from 'react-hot-toast';

export default function LiveAttendancePage() {
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState('');
  const [records, setRecords] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState({});

  useEffect(() => {
    api.listClasses().then(({ data }) => setClasses(data));
  }, []);

  const refreshRecords = async () => {
    if (!classId) {
      toast.error('Please select a class first');
      return;
    }
    setLoading(true);
    try {
      const res = await api.attendanceByClass(classId, { date: new Date().toISOString().slice(0, 10) });
      console.log('Attendance response:', res);
      setRecords(Array.isArray(res.data) ? res.data : []);
      setCapturedImage(null);
      toast.success('Attendance refreshed!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to refresh attendance');
    } finally {
      setLoading(false);
    }
  };

  const scanAndMark = async (image) => {
    if (!classId) return toast.error('Select a class');
    try {
      const { data } = await api.markByFace({ classId, faceData: image });
      toast.success(`✅ Marked: ${data.student.name} (${Math.round((data.matchScore || 0) * 100)}%)`);
      await refreshRecords();
    } catch {
      toast.error('❌ No face match found');
    }
  };

  const markManual = async (studentId, status) => {
    if (!classId) return;
    setMarking(prev => ({ ...prev, [studentId]: true }));
    try {
      await api.markAttendance({ 
        classId, 
        studentId, 
        status,
        timestamp: Date.now()
      });
      toast.success(`${status.toUpperCase()} marked!`);
      await refreshRecords();
    } catch (err) {
      toast.error(`Failed to mark ${status}`);
    } finally {
      setMarking(prev => ({ ...prev, [studentId]: false }));
    }
  };

  const summary = records.reduce((acc, record) => {
    if (record.status === 'present') acc.present++;
    else if (record.status === 'absent') acc.absent++;
    else if (record.status === 'leave') acc.leave++;
    acc.total++;
    return acc;
  }, { present: 0, absent: 0, leave: 0, total: 0 });

  return (
    <PageTransition>
      {/* 🔥 FIXED: SINGLE PARENT DIV WRAPS EVERYTHING */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <select
              className="border rounded-xl p-3 min-w-[200px] bg-white text-slate-900 border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-brand-500"
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
            <AnimatedButton onClick={refreshRecords} disabled={loading || !classId}>
              {loading ? 'Loading...' : '🔄 Refresh'}
            </AnimatedButton>
          </div>

          {records.length > 0 && (
            <div className="flex gap-4 text-sm font-semibold bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
              <span className="text-green-600">✅ {summary.present}</span>
              <span className="text-red-500">❌ {summary.absent}</span>
              <span className="text-yellow-600">📋 {summary.leave}</span>
              <span className="text-slate-700 dark:text-slate-300">👥 {summary.total}</span>
            </div>
          )}
        </div>

        {/* Webcam */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">🎥 Live Face Recognition</h2>
          <WebcamCapture onCapture={(img) => { 
            setCapturedImage(img); 
            scanAndMark(img); 
          }} />
          {capturedImage && (
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <p className="text-sm text-slate-500 mb-2">📸 Last captured:</p>
              <img src={capturedImage} alt="Captured" className="rounded-lg max-w-xs border" />
            </div>
          )}
        </GlassCard>

        {/* Student Cards */}
        {records.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">📋 Class Attendance</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {records.map((record) => (
                <GlassCard key={record._id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {record.student.rollNo.slice(-2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                        {record.student.name}
                      </h3>
                      <p className="text-xs text-slate-500">#{record.student.rollNo}</p>
                    </div>
                  </div>

                  {record.status === 'present' ? (
                    <div className="text-center p-4 bg-green-100 rounded-2xl border-2 border-green-200 dark:bg-green-900/30 dark:border-green-800">
                      <div className="text-3xl mb-2">✅</div>
                      <div className="font-bold text-lg text-green-800 dark:text-green-200 mb-1">Present</div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        {record.time ? new Date(record.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                      </div>
                    </div>
                  ) : record.status === 'leave' ? (
                    <div className="text-center p-4 bg-yellow-100 rounded-2xl border-2 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-800">
                      <div className="text-3xl mb-2">📋</div>
                      <div className="font-bold text-lg text-yellow-800 dark:text-yellow-200">On Leave</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <AnimatedButton
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 font-medium shadow-lg"
                        onClick={() => markManual(record.student._id, 'absent')}
                        disabled={marking[record.student._id]}
                      >
                        {marking[record.student._id] ? '⏳' : '❌'} Mark Absent
                      </AnimatedButton>
                      <AnimatedButton
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 font-medium shadow-lg"
                        onClick={() => markManual(record.student._id, 'leave')}
                        disabled={marking[record.student._id]}
                      >
                        {marking[record.student._id] ? '⏳' : '📋'} Mark Leave
                      </AnimatedButton>
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
