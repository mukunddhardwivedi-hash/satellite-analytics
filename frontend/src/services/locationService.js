import api from './api';

const locationService = {
  getAll: () => api.get('/locations'),
  getPublic: () => api.get('/locations/public/list'),
  getById: (id) => api.get(`/locations/${id}`),
  create: (data) => api.post('/locations', data),
  update: (id, data) => api.put(`/locations/${id}`, data),
  delete: (id) => api.delete(`/locations/${id}`),
};

export default locationService;
