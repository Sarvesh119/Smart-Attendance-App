// backend/tests/faceRecognition.test.js
import assert from 'assert';
import { generateEmbedding, matchFace } from '../utils/faceRecognition.js';

const buf = Buffer.from('hello');
const emb = generateEmbedding(buf);
assert.equal(emb.vector.length, 128);

const res = matchFace(emb, [emb.vector], 0.8);
assert.ok(res && res.index === 0);
