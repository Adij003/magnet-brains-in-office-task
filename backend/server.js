const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");  // ✅ Import CORS
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

// ✅ Use CORS Middleware
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true, 
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/stripe", require("./routes/stripeRoute"));

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
