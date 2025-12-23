// backend/routes/studentRoutes.js
import express from 'express';
import multer from 'multer';
import Student from '../models/Student.js';
import Class from '../models/Class.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { generateEmbedding } from '../utils/faceRecognition.js';

const router = express.Router();
const upload = multer();

router.post('/', protect, authorize('admin', 'teacher'), upload.single('image'), async (req, res) => {
  try {
    const { name, rollNo, classId } = req.body;
    const klass = await Class.findById(classId);
    if (!klass) return res.status(404).json({ message: 'Class not found' });

    let faceEmbedding = undefined;
    if (req.file?.buffer) {
      faceEmbedding = generateEmbedding(req.file.buffer);
    }
    const student = await Student.create({ name, rollNo, classId, faceEmbedding });
    res.status(201).json(student);
  } catch (e) {
    res.status(500).json({ message: 'Create student failed' });
  }
});

router.get('/', protect, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10, classId } = req.query;
    const q = {
      ...(classId ? { classId } : {}),
      ...(search ? { name: { $regex: search, $options: 'i' } } : {})
    };
    const total = await Student.countDocuments(q);
    const students = await Student.find(q)
      .populate('classId')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    res.json({ students, total, page: Number(page), limit: Number(limit) });
  } catch (e) {
    res.status(500).json({ message: 'Fetch students failed' });
  }
});

router.get('/:id', protect, authorize('admin', 'teacher'), async (req, res) => {
  const s = await Student.findById(req.params.id).populate('classId');
  if (!s) return res.status(404).json({ message: 'Not found' });
  res.json(s);
});

router.put('/:id', protect, authorize('admin', 'teacher'), upload.single('image'), async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file?.buffer) {
      update.faceEmbedding = generateEmbedding(req.file.buffer);
    }
    const s = await Student.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(s);
  } catch {
    res.status(500).json({ message: 'Update failed' });
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
