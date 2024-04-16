const { Router } = require("express");
const routes = new Router();

const prodController = require("../controllers/productController");
const isLoggedIn = require("../middleware/isLoggedIn");

routes.get('/products', prodController.getProducts)
routes.post('/product',isLoggedIn,  prodController.createProduct)
routes.get('/product/:id', prodController.getProduct)
routes.get('/product/category/:id', prodController.getProductByCategory)
routes.get('/categories', prodController.getCategories)
routes.post('/category', prodController.createCategory)

module.exports = routes