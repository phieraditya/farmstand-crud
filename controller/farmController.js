const Product = require('../models/product');
const Farm = require('../models/farm');

const categories = ['fruit', 'vegetable', 'dairy', 'else'];

// @desc    Get All Farms
// @route   GET /farms
// @access  Public
const getFarms = async (req, res) => {
  const farms = await Farm.find();
  res.render('farms/index', { farms });
};

// @desc    Get Form to Create New Farm
// @route   GET /farms/new
// @access  Private
const formNewFarm = (req, res) => {
  res.render('farms/new');
};

// @desc    Save New Farm
// @route   POST /farms
// @access  Private
const saveNewFarm = async (req, res) => {
  const newFarm = new Farm(req.body);
  await newFarm.save();
  res.redirect(`/farms`);
};

// @desc    Show detail of one farm
// @route   GET /farms/:id
// @access  Public
const showOneFarm = async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate('products');
  res.render('farms/show', { farm });
};

// @desc    Get Form to Create New Product in certain farm
// @route   GET /farms/:id/products/new
// @access  Private
const formNewProduct = async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  res.render('products/new', { categories, farm });
};

// @desc    Save New Product in certain farm
// @route   POST /farms/:id/products
// @access  Private
const saveNewProduct = async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);

  const { name, price, category } = req.body;
  const newProduct = new Product({ name, price, category });

  farm.products.push(newProduct);
  newProduct.farm = farm;
  await farm.save();
  await newProduct.save();
  res.redirect(`/farms/${id}`);
};

// @desc    Delete of a farm
// @route   DELETE /farms/:id
// @access  Private
const deleteFarm = async (req, res) => {
  await Farm.findByIdAndDelete(req.params.id);
  res.redirect('/farms');
};

module.exports = {
  getFarms,
  formNewFarm,
  saveNewFarm,
  showOneFarm,
  formNewProduct,
  saveNewProduct,
  deleteFarm,
};
