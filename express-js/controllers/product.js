const path = require('path');
const rootDir = require('../utils/path');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views/html', 'add-product.html'));
}

exports.addProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProduct = (req, res, next) => {
    const product = Product.fetchAll();
    res.sendFile(path.join(rootDir, 'views/html', 'shop.html'), { product: product[product.length - 1] });
}

exports.getProductJson = (req, res, next) => {
    const product = Product.fetchAll();
    res.json({ product: product[product.length - 1] });
}
