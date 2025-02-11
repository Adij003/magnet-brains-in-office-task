import axios from "axios";

const API_URL = "/api/product/"; // Ensure this matches your backend route

// Fetch all products
const getAllProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Fetch a single product by ID
const getProductById = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}${productId}`, config);
  return response.data;
};

// Create a new product (Admin-only)

const productService = {
  getAllProducts,
  getProductById,
 
};

export default productService;
