const express = require("express");
const router = express.Router();
const { createOrder, getUserOrders, updatePaymentStatus } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.get("/", protect, getUserOrders);
router.put("/:orderId", protect, updatePaymentStatus);

module.exports = router;
