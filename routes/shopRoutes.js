const { Router } = require("express");
const routes = new Router();
const shopController = require('../controllers/shopController');
const isLoggedIn = require("../middleware/isLoggedIn");


routes.get( '/cart', isLoggedIn,  shopController.getCart)
routes.post( '/cart', isLoggedIn,  shopController.postCart)
routes.delete( '/cart', isLoggedIn,  shopController.postCartDeleteProduct)
routes.post( '/create-order', isLoggedIn,  shopController.createOrder)
routes.get( '/orders', isLoggedIn,  shopController.getOrders)

module.exports = routes