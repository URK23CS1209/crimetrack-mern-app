import axios from 'axios';

const API = axios.create({
  baseURL: 'https://crimetrack-mern-app.onrender.com/api', // ✅ full backend URL
});


// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: (data) => API.post('/auth/signup', data),
  login: (data) => API.post('/auth/login', data),
  changePassword: (data) => API.put('/auth/change-password', data)
};

// User APIs
export const userAPI = {
  getAllUsers: () => API.get('/users'),
  addUser: (data) => API.post('/users', data),
  updateUser: (id, data) => API.put(`/users/${id}`, data),
  deleteUser: (id) => API.delete(`/users/${id}`)
};

// Crime APIs
export const crimeAPI = {
  getAllCrimes: () => API.get('/crimes'),
  getCrimeById: (id) => API.get(`/crimes/${id}`),
  addCrime: (data) => API.post('/crimes', data),
  updateCrime: (id, data) => API.put(`/crimes/${id}`, data),
  deleteCrime: (id) => API.delete(`/crimes/${id}`),
  getStats: () => API.get('/crimes/stats/overview')
};

export default API;