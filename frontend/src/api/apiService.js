import axios from 'axios';

// Single source of truth for the base URL
const baseURL =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000'
    : 'https://yvonne.tagooledavid.com';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// Automatically attach the JWT access token to every request
api.interceptors.request.use(
  (config) => {
    const raw = localStorage.getItem('authTokens');
    if (raw) {
      const { access } = JSON.parse(raw);
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  // POST /api/token/login/  → { access, refresh, email, role }
  login: (credentials) => api.post('/api/token/login/', credentials),
  // POST /api/users/users/  → create account
  register: (userData) => api.post('/api/users/users/', userData),
  // GET  /api/users/users/me/
  getProfile: () => api.get('/api/users/users/me/'),
  // POST /api/token/logout/
  logout: (refreshToken) => api.post('/api/token/logout/', { refresh: refreshToken }),
  // POST /api/users/users/change_password/
  changePassword: (data) => api.post('/api/users/users/change_password/', data),
};

// ── Student ───────────────────────────────────────────────────────────────────
export const studentAPI = {
  getDashboard: () => api.get('/api/users/users/me/'),
  getLogs: () => api.get('/api/logs/'),
  submitLog: (logData) => api.post('/api/logs/', logData),
  updateLog: (id, data) => api.patch(`/api/logs/${id}/`, data),
  getPlacements: () => api.get('/api/placements/'),
  getEvaluations: () => api.get('/api/evaluations/'),
};

// ── Supervisor (both workplace and academic) ──────────────────────────────────
export const supervisorAPI = {
  getDashboard: () => api.get('/api/users/users/me/'),
  getStudents: () => api.get('/api/users/users/'),
  reviewLog: (logId, reviewData) => api.post(`/api/reviews/`, { log: logId, ...reviewData }),
  getReviewQueue: () => api.get('/api/logs/'),
  submitEvaluation: (data) => api.post('/api/evaluations/', data),
};

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminAPI = {
  getStats: () => api.get('/api/users/users/me/'),
  getUsers: () => api.get('/api/users/users/'),
  deactivateUser: (id) => api.post(`/api/users/users/${id}/deactivate/`),
  assignPlacement: (data) => api.post('/api/placements/', data),
  getPlacements: () => api.get('/api/placements/'),
  getLogs: () => api.get('/api/logs/'),
  getSupervisorApplications: () => api.get('/api/users/supervisor-applications/'),
  approveApplication: (id) => api.post(`/api/users/supervisor-applications/${id}/approve/`),
  rejectApplication: (id) => api.post(`/api/users/supervisor-applications/${id}/reject/`),
};

export default api;
