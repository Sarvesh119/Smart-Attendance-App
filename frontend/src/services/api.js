// frontend/src/services/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

let bearer = '';

instance.interceptors.request.use((config) => {
  if (bearer) config.headers.Authorization = `Bearer ${bearer}`;
  return config;
});

export default {
  setToken: (t) => {
    bearer = t;
  },
  get: (url, params) => instance.get(url, { params }),
  post: (url, body, config) => instance.post(url, body, config),
  put: (url, body) => instance.put(url, body),
  delete: (url) => instance.delete(url),

  // Auth
  me: () => instance.get('/auth/me'),

  // Students
  listStudents: (params) => instance.get('/students', { params }),
  getStudent: (id) => instance.get(`/students/${id}`),
  createStudent: (formData) =>
    instance.post('/students', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  updateStudent: (id, formData) =>
    instance.put(`/students/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  deleteStudent: (id) => instance.delete(`/students/${id}`),

  // Classes
  listClasses: () => instance.get('/classes'),
  createClass: (body) => instance.post('/classes', body),
  updateClass: (id, body) => instance.put(`/classes/${id}`, body),
  deleteClass: (id) => instance.delete(`/classes/${id}`),

  
  // 🔹 FIXED: Attendance - Now supports date range (from/to) AND single date
  markAttendance: (body) => instance.post('/attendance/mark', body),
  markByFace: (body) => instance.post('/attendance/mark-by-face', body),
  attendanceByClass: (classId, params = {}) => instance.get(`/attendance/class/${classId}`, { params }),
  attendanceByStudent: (studentId, params) => instance.get(`/attendance/student/${studentId}`, { params })
};

