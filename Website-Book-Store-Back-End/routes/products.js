const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.route('/')
  .get(productController.index)
  .post(productController.newProduct)

router.route('/:productId')
  .get(productController.getProductId)
  .put(productController.replaceProduct)
  .delete(productController.removeProduct)

module.exports = router;
