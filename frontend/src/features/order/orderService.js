// orderService.js
import axios from "axios";

const API_URL = "/api/order/";

// Place an order (no need to send orderData)
const placeOrder = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, {}, config); // No orderData needed
  return response.data;
  console.log('we are in order service redux, order placed');
};

// Get user orders
const getOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const orderService = {
  placeOrder,
  getOrders,
};

export default orderService;
