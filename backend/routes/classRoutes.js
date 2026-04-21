// backend/routes/classRoutes.js
import express from 'express';
import Class from '../models/Class.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const { name, section, subject } = req.body;
    const klass = await Class.create({ name, section, subject, teacher: req.user._id });
    res.status(201).json(klass);
  } catch {
    res.status(500).json({ message: 'Create class failed' });
  }
});

router.get('/', protect, authorize('admin', 'teacher'), async (req, res) => {
  const classes = await Class.find().populate('teacher', 'name email');
  res.json(classes);
});

router.get('/:id', protect, authorize('admin', 'teacher'), async (req, res) => {
  const klass = await Class.findById(req.params.id).populate('teacher', 'name email');
  if (!klass) return res.status(404).json({ message: 'Not found' });
  res.json(klass);
});

router.put('/:id', protect, authorize('admin', 'teacher'), async (req, res) => {
  const klass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(klass);
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  await Class.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
