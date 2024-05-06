const { Router } = require("express");
const routes = new Router();
const userControl = require("../controllers/userController");
const { favoriteProduct } = require("../controllers/productController");
const isLoggedIn = require("../middleware/isLoggedIn");
const {validateEmail, validateName, validatePassword,validateCity, validateState} = require("../services/validators")
routes.post('/login', userControl.userLogin)
routes.post('/signup', [validateEmail, validateName, validatePassword,validateCity, validateState], userControl.userSignUp)
routes.post('/favorite',isLoggedIn, favoriteProduct)

module.exports = routes