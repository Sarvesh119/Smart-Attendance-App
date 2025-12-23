// backend/models/Attendance.js
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    status: { type: String, enum: ['present', 'absent', 'late'], default: 'present' },
    time: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

attendanceSchema.index({ student: 1, class: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);
