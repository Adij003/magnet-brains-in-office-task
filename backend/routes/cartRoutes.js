const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

// Add a product to cart
router.post("/:productId", protect, addToCart);

// Get the cart
router.get("/", protect, getCart);

// Update cart item quantity
router.put("/:productId", protect, updateCartItem);

// Remove item from cart
router.delete("/:productId", protect, removeCartItem);

// Clear entire cart
router.delete("/", protect, clearCart);

module.exports = router;
