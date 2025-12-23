// backend/tests/authMiddleware.test.js
import assert from 'assert';
import jwt from 'jsonwebtoken';

import { protect } from '../middleware/authMiddleware.js';

const req = { headers: { authorization: 'Bearer ' + jwt.sign({ id: 'x', role: 'admin' }, 'test') } };
const res = { status: (c) => ({ json: (m) => ({ c, m }) }) };

assert.ok(typeof protect === 'function');
