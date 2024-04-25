const { Product } = require("../models/product")
const { User } = require("../models/user")

exports.getCart = async (req, res, next) => {

    const userProducts = await User.findByPk(req.userId)
        .then(user => {
            return user.getCart()
        }).then(cart => cart.getProducts())

    console.log(userProducts)
    res.status(200).json({ message: "Carrinho do Usuário", cartProducts: userProducts })

}

exports.postCart = async (req, res, next) => {
    const prodId = req.body.productId
    let fetchedCart

    const userProducts = await User.findByPk(req.userId)
        .then(user => {
            return user.getCart()
        }).then(cart => {
            fetchedCart =cart
            return cart.getProducts({where: {id: prodId}})
        }).then(products => {
            let product;
            if(products.length>0){
                product = products[0]
            }
            let newQuantity = 1
            if(product){
                //
            }
            return Product.findByPk(prodId).then(prod => fetchedCart.addProduct(prod))
        })

    console.log(userProducts)
    res.status(200).json({ message: "Carrinho do Usuário", cartProducts: userProducts })

}