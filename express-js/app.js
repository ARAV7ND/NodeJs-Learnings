const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./utils/path');

// import segregated routes 
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//middleware to load static files like Css.
app.use(express.static(path.join(__dirname, '/public')));

// register routes
app.use(adminRoutes);
app.use(shopRoutes);

// genric error page
app.use(errorController.get404)

app.listen(3000);