const express = require('express');
const router = express.Router();

const {
  getFarms,
  formNewFarm,
  saveNewFarm,
  showOneFarm,
  formNewProduct,
  saveNewProduct,
  deleteFarm,
} = require('../controller/farmController');

// --- FARM ROUTES ---
// All Farms
router.get('/', getFarms);

// Get Form to Create New Farm
router.get('/new', (req, res) => {
  res.render('farms/new');
});
// Save New Farm
router.post('/', saveNewFarm);

// Show detail of one farm
router.get('/:id', showOneFarm);

// Get Form to Create New Product in certain farm
router.get('/:id/products/new', formNewProduct);
// Save New Product in certain farm
router.post('/:id/products', saveNewProduct);

// Delete of a farm
router.delete('/:id', deleteFarm);

module.exports = router;
