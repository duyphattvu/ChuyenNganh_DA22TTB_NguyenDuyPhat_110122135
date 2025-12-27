// Cấu hình API
const API_BASE_URL = 'http://localhost/shop-giay/api';

export const API_ENDPOINTS = {
  // Products
  products: `${API_BASE_URL}/products`,
  productsManage: `${API_BASE_URL}/products/manage.php`,
  
  // Categories
  categories: `${API_BASE_URL}/categories`,
  
  // Banners
  banners: `${API_BASE_URL}/banners`,
  
  // Orders
  orders: `${API_BASE_URL}/orders`,
  
  // Auth
  auth: `${API_BASE_URL}/auth`,
  
  // Support
  support: `${API_BASE_URL}/support`,
};

// Helper function để gọi API
export const apiCall = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const response = await fetch(endpoint, { ...defaultOptions, ...options });
  const data = await response.json();
  return data;
};

// API Functions
export const productAPI = {
  getAll: () => apiCall(API_ENDPOINTS.products),
  getById: (id) => apiCall(`${API_ENDPOINTS.products}?id=${id}`),
  getByCategory: (category) => apiCall(`${API_ENDPOINTS.products}?category=${category}`),
  getSale: () => apiCall(`${API_ENDPOINTS.products}?sale=true`),
  getFeatured: () => apiCall(`${API_ENDPOINTS.products}?featured=true`),
  search: (query) => apiCall(`${API_ENDPOINTS.products}?search=${encodeURIComponent(query)}`),
  create: (data) => apiCall(API_ENDPOINTS.productsManage, { method: 'POST', body: JSON.stringify(data) }),
  update: (data) => apiCall(API_ENDPOINTS.productsManage, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`${API_ENDPOINTS.productsManage}?id=${id}`, { method: 'DELETE' }),
};

export const categoryAPI = {
  getAll: () => apiCall(API_ENDPOINTS.categories),
  getById: (id) => apiCall(`${API_ENDPOINTS.categories}?id=${id}`),
  create: (data) => apiCall(API_ENDPOINTS.categories, { method: 'POST', body: JSON.stringify(data) }),
  update: (data) => apiCall(API_ENDPOINTS.categories, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`${API_ENDPOINTS.categories}?id=${id}`, { method: 'DELETE' }),
};

export const bannerAPI = {
  getAll: () => apiCall(API_ENDPOINTS.banners),
  getActive: () => apiCall(`${API_ENDPOINTS.banners}?active=true`),
  create: (data) => apiCall(API_ENDPOINTS.banners, { method: 'POST', body: JSON.stringify(data) }),
  update: (data) => apiCall(API_ENDPOINTS.banners, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`${API_ENDPOINTS.banners}?id=${id}`, { method: 'DELETE' }),
};

export const orderAPI = {
  getAll: () => apiCall(API_ENDPOINTS.orders),
  getById: (id) => apiCall(`${API_ENDPOINTS.orders}?id=${id}`),
  getByUser: (userId) => apiCall(`${API_ENDPOINTS.orders}?user_id=${userId}`),
  getByCode: (code) => apiCall(`${API_ENDPOINTS.orders}?code=${code}`),
  create: (data) => apiCall(API_ENDPOINTS.orders, { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id, status) => apiCall(API_ENDPOINTS.orders, { method: 'PUT', body: JSON.stringify({ id, status }) }),
  delete: (id) => apiCall(`${API_ENDPOINTS.orders}?id=${id}`, { method: 'DELETE' }),
};

export const authAPI = {
  login: (email, password) => apiCall(`${API_ENDPOINTS.auth}?action=login`, { 
    method: 'POST', 
    body: JSON.stringify({ email, password }) 
  }),
  register: (data) => apiCall(`${API_ENDPOINTS.auth}?action=register`, { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  updateProfile: (data) => apiCall(`${API_ENDPOINTS.auth}?action=update`, { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  getUser: (id) => apiCall(`${API_ENDPOINTS.auth}?id=${id}`),
  getAllUsers: () => apiCall(API_ENDPOINTS.auth),
};

export const supportAPI = {
  getAll: () => apiCall(API_ENDPOINTS.support),
  getById: (id) => apiCall(`${API_ENDPOINTS.support}?id=${id}`),
  create: (data) => apiCall(API_ENDPOINTS.support, { method: 'POST', body: JSON.stringify(data) }),
  update: (data) => apiCall(API_ENDPOINTS.support, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`${API_ENDPOINTS.support}?id=${id}`, { method: 'DELETE' }),
};

export default API_BASE_URL;
