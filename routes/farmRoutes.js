const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const Farm = require('../models/farm');

const categories = ['fruit', 'vegetable', 'dairy', 'else'];

// --- FARM ROUTES ---
// All Farms
router.get('/', async (req, res) => {
  const farms = await Farm.find();
  res.render('farms/index', { farms });
});

// Get Form to Create New Farm
router.get('/new', (req, res) => {
  res.render('farms/new');
});
// Save New Farm
router.post('/', async (req, res) => {
  const newFarm = new Farm(req.body);
  await newFarm.save();
  res.redirect(`/farms`);
});

// Show detail of one farm
router.get('/:id', async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate('products');
  res.render('farms/show', { farm });
});

// Get Form to Create New Product in certain farm
router.get('/:id/products/new', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  res.render('products/new', { categories, farm });
});
// Save New Product in certain farm
router.post('/:id/products', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);

  const { name, price, category } = req.body;
  const newProduct = new Product({ name, price, category });

  farm.products.push(newProduct);
  newProduct.farm = farm;
  await farm.save();
  await newProduct.save();
  res.redirect(`/farms/${id}`);
});

// Delete of a farm
router.delete('/:id', async (req, res) => {
  await Farm.findByIdAndDelete(req.params.id);
  res.redirect('/farms');
});

module.exports = router;
