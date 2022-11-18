const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const Farm = require('../models/farm');

const categories = ['fruit', 'vegetable', 'dairy', 'else'];

// --- PRODUCT ROUTES ---
// All Products or by Category
router.get('/', async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render('products/index', { products, category });
  } else {
    const products = await Product.find({});
    res.render('products/index', { products, category: 'All' });
  }
});

// Get Form to Create New Product
router.get('/new', (req, res) => {
  res.render('products/new', { categories });
});
// Save New Product
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

// Show detail of one product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'farm',
    'name'
  );
  console.log(product);
  res.render('products/show', { product });
});

// Get Form to Edit of one product
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
});
// Update of one product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// Delete of one product
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
});

module.exports = router;
