const express = require('express');
const router = express.Router();

const {
  getProducts,
  getOneProduct,
  getEditProductForm,
  updateProduct,
  deleteProduct,
} = require('../controller/productController');

router.route('/').get(getProducts);

router
  .route('/:id')
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProduct);

router.route('/:id/edit').get(getEditProductForm);

module.exports = router;
