// backend/scripts/seedAdmin.js
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

async function run() {
  await connectDB();
  const email = 'admin@school.com';
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists:', email);
    process.exit(0);
  }
  const admin = await User.create({
    name: 'Super Admin',
    email,
    password: 'Admin@123',
    role: 'admin'
  });
  console.log('Admin created:', admin.email);
  process.exit(0);
}

run();
