const { Router } = require("express");
const routes = new Router();
const shopController = require('../controllers/shopController');
const isLoggedIn = require("../middleware/isLoggedIn");


routes.get( '/cart', isLoggedIn,  shopController.getCart)
routes.post( '/cart', isLoggedIn,  shopController.postCart)
routes.post( '/create-order', isLoggedIn,  shopController.postOrder)

module.exports = routes