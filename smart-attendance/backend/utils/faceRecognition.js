// backend/utils/faceRecognition.js
// Replace with real provider (face-api.js via tfjs-node, external API, etc.)
import crypto from 'crypto';

export function generateEmbedding(imageBuffer) {
  // Mock: deterministic hash -> numeric vector
  const hash = crypto.createHash('sha256').update(imageBuffer).digest();
  const vector = Array.from(hash).slice(0, 128).map((b) => b / 255);
  return { vector, model: 'mock-v1' };
}

export function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const normB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return dot / (normA * normB || 1);
}

export function matchFace(embedding, studentEmbeddingsArray, threshold = 0.9) {
  // Returns best match above threshold
  let best = { index: -1, score: -1 };
  studentEmbeddingsArray.forEach((vec, idx) => {
    const score = cosineSimilarity(embedding.vector, vec);
    if (score > best.score) best = { index: idx, score };
  });
  if (best.score >= threshold) return best;
  return null;
}
