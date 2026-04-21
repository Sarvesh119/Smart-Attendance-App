// backend/models/Student.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rollNo: { type: String, required: true, unique: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    faceEmbedding: {
      vector: { type: [Number], default: [] }, // store numeric vector
      model: { type: String, default: 'mock-v1' },
      createdAt: { type: Date, default: Date.now }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
