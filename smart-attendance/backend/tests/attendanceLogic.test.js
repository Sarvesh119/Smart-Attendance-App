// backend/tests/attendanceLogic.test.js
import assert from 'assert';
import { cosineSimilarity } from '../utils/faceRecognition.js';

const a = Array(128).fill(0.5);
const b = Array(128).fill(0.5);
assert.ok(cosineSimilarity(a, b) > 0.99);
