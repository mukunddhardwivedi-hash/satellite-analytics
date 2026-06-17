import api from './api';

const satelliteService = {
  getAll: (params) => api.get('/satellite', { params }),
  getById: (id) => api.get(`/satellite/${id}`),
  create: (data) => api.post('/satellite', data),
  update: (id, data) => api.put(`/satellite/${id}`, data),
};

export default satelliteService;
