const Product = require('../models/product');
const Farm = require('../models/farm');

const categories = ['fruit', 'vegetable', 'dairy', 'else'];

// @desc    Get All Products or by Category
// @route   GET /products
// @access  Public
const getProducts = async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render('products/index', { products, category });
  } else {
    const products = await Product.find({});
    res.render('products/index', { products, category: 'All' });
  }
};

// @desc    Get (show) detail of one product
// @route   GET /products/:id
// @access  Public
const getOneProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'farm',
    'name'
  );
  console.log(product);
  res.render('products/show', { product });
};

// @desc    Get Form to Edit of one product
// @route   GET /products/:id/edit
// @access  Private
const getEditProductForm = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
};
// @desc    Update of one product
// @route   PUT /products/:id
// @access  Private
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
};

// @desc    Delete of one product
// @route   DELETE /products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};

module.exports = {
  getProducts,
  getOneProduct,
  getEditProductForm,
  updateProduct,
  deleteProduct,
};
