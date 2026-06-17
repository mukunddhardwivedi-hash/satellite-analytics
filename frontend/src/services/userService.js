import api from './api';

const userService = {
  getProfile: (id) => api.get(`/users/profile/${id}`),
  updateProfile: (data) => api.put('/users/profile/update', data),
  changePassword: (data) => api.post('/users/change-password', data),
};

export default userService;
