const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// @desc Add product to cart
// @route POST /api/cart/:productId
// @access Private
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  // Find user's cart or create a new one
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  // Check if product already exists in the cart
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity if already exists
  } else {
    cart.items.push({ productId, quantity: 1 });
  }

  await cart.save();
  res.status(200).json(cart);
});

// @desc Get user's cart
// @route GET /api/cart
// @access Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "items.productId",
    "name price image"
  );

  if (!cart) {
    return res.status(404).json({ message: "Cart is empty" });
  }

  res.status(200).json(cart);
});

// @desc Update quantity of a product in cart
// @route PUT /api/cart/:productId
// @access Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const userId = req.user.id;
  const productId = req.params.productId;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const item = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (!item) {
    return res.status(404).json({ message: "Product not in cart" });
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    ); // Remove item if quantity is 0
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  res.status(200).json(cart);
});

// @desc Remove a product from cart
// @route DELETE /api/cart/:productId
// @access Private
const removeCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();
  res.status(200).json({ message: "Item removed", cart });
});

// @desc Clear entire cart
// @route DELETE /api/cart
// @access Private
const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user.id });
  res.status(200).json({ message: "Cart cleared" });
});

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
