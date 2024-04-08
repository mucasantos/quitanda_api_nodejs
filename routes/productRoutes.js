const { Router } = require("express");
const routes = new Router();

const prodController = require("../controllers/productController")

routes.post('/product', (req, res)=> {
    res.json({msg: "Tudo ok.."})
})

routes.get('/products', prodController.getProducts)
routes.get('/categories', prodController.getCategories)

module.exports = routes