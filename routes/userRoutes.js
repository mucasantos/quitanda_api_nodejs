const { Router } = require("express");
const routes = new Router();
const userControl = require("../controllers/userController");
const { favoriteProduct } = require("../controllers/productController");

routes.post('/login', userControl.userLogin)
routes.post('/signup', userControl.userSignUp)
routes.post('/favorite', favoriteProduct)

module.exports = routes