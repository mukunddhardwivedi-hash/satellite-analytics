import api from './api';

const analysisService = {
  getAll: () => api.get('/analysis'),
  getById: (id) => api.get(`/analysis/${id}`),
  create: (data) => api.post('/analysis', data),
  update: (id, data) => api.put(`/analysis/${id}`, data),
  delete: (id) => api.delete(`/analysis/${id}`),
};

export default analysisService;
