const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

// @desc Create an order from the cart
// @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Logged-in user
  const userEmail = req.user.email;

  // Find the user's cart
  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty, cannot place order");
  }

  // Transform cart items into order items
  const orderItems = cart.items.map((item) => ({
    productId: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    quantity: item.quantity,
  }));

  // Create the order
  const order = await Order.create({
    userId,
    userEmail,
    items: orderItems,
    paymentStatus: "pending",
  });

  // Clear the user's cart after order is placed
//   await Cart.findOneAndDelete({ userId });

  res.status(201).json(order);
});

// @desc Get all orders for a user
// @route GET /api/orders
// @access Private
const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const orders = await Order.find({ userId });
  res.status(200).json(orders);
});

// @desc Update order payment status
// @route PUT /api/orders/:orderId
// @access Private
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { paymentStatus, transactionId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.paymentStatus = paymentStatus || order.paymentStatus;
  order.transactionId = transactionId || order.transactionId;

  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

module.exports = { createOrder, getUserOrders, updatePaymentStatus };
