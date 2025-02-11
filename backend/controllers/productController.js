const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc Create a product
// @route POST /api/products
// @access Private
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || !price) {
    res.status(400);
    throw new Error("Please include all required fields (name, price)");
  }

  const product = await Product.create({
    name,
    price,
    description,
    image,
  });

  res.status(201).json(product);
});

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// @desc Get a single product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private (Admin only)
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.image = image || product.image;

  const updatedProduct = await product.save();

  res.status(200).json(updatedProduct);
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private (Admin only)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
