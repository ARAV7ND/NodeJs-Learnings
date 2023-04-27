const path = require('path');
const express = require('express');
const productController = require('../controllers/product');
const router = express.Router();


router.get("/admin/add-product", productController.getAddProduct);
router.post('/admin/add-product', productController.addProduct);

module.exports = router;