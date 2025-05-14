import api from './api';

const productApi = {
  getAllProducts: () => api.get('/products'),

  getProductById: (id) => api.get(`/products/${id}`),

  createProduct: (product) => api.post('/products', product),

  updateProduct: (id, product) => api.put(`/products/${id}`, product),

  deleteProduct: (id) => api.delete(`/products/${id}`),

  searchProducts: (name) => api.get(`/products/search?name=${name}`)
};

export default productApi;
