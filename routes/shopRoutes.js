const { Router } = require("express");
const routes = new Router();
const shopController = require('../controllers/shopController');
const isLoggedIn = require("../middleware/isLoggedIn");


routes.get( '/cart', isLoggedIn,  shopController.getCart)

module.exports = routes