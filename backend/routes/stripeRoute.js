const express = require("express");
const Stripe = require("stripe");
const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel"); // Import your Cart model
require("dotenv").config();
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
    "/create-checkout-session", protect, 
    asyncHandler(async (req, res) => {
      try {
        console.log("Authorization Header:", req.headers.authorization); // Debugging
  
        // Get the user's cart
        const cart = await Cart.findOne({ userId: req.user.id }).populate(
          "items.productId",
          "name price image"
        );
  
        if (!cart || cart.items.length === 0) {
          return res.status(400).json({ message: "Your cart is empty" });
        }
  
        // Convert cart items into Stripe's format
        const lineItems = cart.items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.productId.name,
              images: [item.productId.image],
            },
            unit_amount: item.productId.price * 100,
          },
          quantity: item.quantity,
        }));
  
        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: `${process.env.CLIENT_URL}/success`,
          cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });
  
        res.json({ id: session.id, url: session.url });
      } catch (error) {
        console.error("Stripe Checkout Error:", error);
        res.status(500).json({ error: error.message }); 
      }
    })
  );
  
module.exports = router;
