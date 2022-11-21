const express = require('express');
const router = express.Router();

const {
  getProducts,
  getOneProduct,
  getEditProductForm,
  updateProduct,
  deleteProduct,
} = require('../controller/productController');

const Product = require('../models/product');
const Farm = require('../models/farm');

const categories = ['fruit', 'vegetable', 'dairy', 'else'];

// --- PRODUCT ROUTES ---
// All Products or by Category
router.get('/', getProducts);

// Show detail of one product
router.get('/:id', getOneProduct);

// Get Form to Edit of one product
router.get('/:id/edit', getEditProductForm);
// Update of one product
router.put('/:id', updateProduct);

// Delete of one product
router.delete('/:id', deleteProduct);

module.exports = router;
