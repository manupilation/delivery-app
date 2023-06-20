// https://axios-http.com/ptbr/docs/instance
import axios from 'axios';

const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND_URL,
});

const authenticateUser = (token) => {
  instanceApi.defaults.headers.common.Authorization = token;
};

const loginRequest = async (body) => {
  const { data } = await instanceApi.post('/login', body);

  return data;
};

const registerRequest = async (body) => {
  const { data } = await instanceApi.post('/register', body);

  return data;
};

const getAllProducts = async (token) => {
  authenticateUser(token);

  const { data } = await instanceApi.get('/customer/products');

  const products = data.map((product) => ({
    ...product,
    quantity: 0,
  }));

  return products;
};

const getAllSellers = async (token) => {
  authenticateUser(token);

  const { data } = await instanceApi.get('/register');

  return data;
};

const createSale = async (token, body) => {
  authenticateUser(token);

  const { data } = await instanceApi.post('/customer/checkout', body);

  return data;
};

const getAllOrders = async (token, role) => {
  authenticateUser(token);

  const { data } = await instanceApi.get(`/${role}/orders`);

  return data;
};

const updateOrder = async (token, role, orderId, body) => {
  authenticateUser(token);

  const { data } = await instanceApi
    .patch(`${role}/orders/${orderId}`, body);

  return data;
};

const sendResetEmail = async (email, url) => {
  const { data } = await instanceApi.post('/reset/sendmail', { email, url });

  return data;
};

const sendResetPassword = async (token, newPass) => {
  const {data} = await instanceApi.post('/reset/password', {token, newPass});

  return data;
}

export {
  createSale,
  getAllOrders,
  getAllProducts,
  getAllSellers,
  instanceApi,
  loginRequest,
  registerRequest,
  updateOrder,
  sendResetEmail,
  sendResetPassword
};
