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

router.route('/').get(getFarms).post(saveNewFarm);
router.route('/new').get(formNewFarm);
router.route('/:id').get(showOneFarm).delete(deleteFarm);
router.route('/:id/products').post(saveNewProduct);
router.route('/:id/products/new').get(formNewProduct);

module.exports = router;
