import api from './api';

const authApi = {
  register: (userData) => api.post('/auth/register', userData),

  login: (credentials) => api.post('/auth/login', credentials)
};

export default authApi;
