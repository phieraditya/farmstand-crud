const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');
const Farm = require('./models/farm');

mongoose
  .connect('mongodb://localhost:27017/farmStand')
  .then(() => {
    console.log('MONGO CONNECTION OPEN!!');
  })
  .catch((err) => {
    console.log('MONGO CONNECTION ERROR!!');
    console.log(err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

// --- ROUTES ---
// --- FARM ROUTES ---
// All Farms
app.get('/farms', async (req, res) => {
  const farms = await Farm.find();
  res.render('farms/index', { farms });
});

// Get Form to Create New Farm
app.get('/farms/new', (req, res) => {
  res.render('farms/new');
});
// Save New Farm
app.post('/farms', async (req, res) => {
  const newFarm = new Farm(req.body);
  await newFarm.save();
  res.redirect(`/farms`);
});

// Show detail of one farm
app.get('/farms/:id', async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate('products');
  res.render('farms/show', { farm });
});

// Get Form to Create New Product in certain farm
app.get('/farms/:id/products/new', (req, res) => {
  const { id } = req.params;
  res.render('products/new', { categories, id });
});
// Save New Product in certain farm
app.post('/farms/:id/products', async (req, res) => {
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

// --- PRODUCT ROUTES ---
// All Products or by Category
app.get('/products', async (req, res) => {
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
app.get('/products/new', (req, res) => {
  res.render('products/new', { categories });
});
// Save New Product
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

// Show detail of one product
app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('products/show', { product });
});

// Get Form to Edit of one product
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
});
// Update of one product
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// Delete of one product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

app.listen(3000, () => {
  console.log('APP IS LISTENING ON PORT 3000!');
});
