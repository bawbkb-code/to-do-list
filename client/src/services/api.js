import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

// Function to set the auth token for all requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// --- Auth ---
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// --- Tasks ---
export const createTask = (taskData) => api.post('/api/tasks', taskData);
export const getAllTasks = (projectId, sprintId) => {
  let url = `/api/projects/${projectId}/tasks`;
  if (sprintId) {
    url += `?sprintId=${sprintId}`;
  }
  return api.get(url);
};
export const getTaskById = (id) => api.get(`/api/tasks/${id}`);
export const updateTask = (id, taskData) => api.put(`/api/tasks/${id}`, taskData);
export const deleteTask = (id) => api.delete(`/api/tasks/${id}`);

// --- Sprints ---
export const createSprint = (projectId, sprintData) => api.post(`/api/projects/${projectId}/sprints`, sprintData);
export const getAllSprints = (projectId) => api.get(`/api/projects/${projectId}/sprints`);

// --- Projects ---
export const createProject = (projectData) => api.post('/api/projects', projectData);
export const getAllProjects = () => api.get('/api/projects');

export default api;
