import axios from "axios";

const API_URL = "/api/cart/"; // Ensure this matches your backend route

// Add a product to the cart
const addToCart = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}${productId}`, {}, config);
  return response.data;
};

// Get the cart items
const getCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update cart item quantity
const updateCartItem = async (productId, quantity, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${productId}`, { quantity }, config);
  return response.data;
};

// Remove an item from the cart
const removeCartItem = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${productId}`, config);
  return response.data;
};

// Clear the entire cart
const clearCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL, config);
  return response.data;
};

// Exporting all functions
const cartService = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};

export default cartService;
