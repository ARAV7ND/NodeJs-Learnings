const path = require('path')
const express = require('express');
const rootDir = require('../utils/path');
const productController = require('../controllers/product');

const router = express.Router();

router.get("/", productController.getProduct);
router.get("/product", productController.getProductJson)
module.exports = router;