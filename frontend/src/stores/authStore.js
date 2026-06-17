import create from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

  initializeAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        set({ loading: true });
        const response = await api.get('/auth/me');
        set({ user: response.data, token });
      } catch (error) {
        localStorage.removeItem('token');
        set({ token: null, user: null });
      } finally {
        set({ loading: false });
      }
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      set({ user: response.data.user, token: response.data.token });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Login failed';
      set({ error: errorMsg });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  register: async (userData) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Registration failed';
      set({ error: errorMsg });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
export { useAuthStore };
