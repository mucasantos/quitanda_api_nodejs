const { Product } = require("../models/product");
const { User } = require("../models/user");

exports.getCart = async (req, res, next) => {
  const userProducts = await User.findByPk(req.userId)
    .then((user) => {
      return user.getCart();
    })
    .then((cart) => cart.getProducts());

  res
    .status(200)
    .json({ message: "Carrinho do Usuário", cartProducts: userProducts });
};

//Ajustar a quintidade devolvida
exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const quantity = req.body.quantity || 1;

  let newQuantity;
  let fetchedCart;

  const userProducts = await User.findByPk(req.userId)
    .then((user) => {
      return user.getCart(); // Magic method do Sequelize
    })
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + quantity;
        return product;
      }
      newQuantity = quantity

      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .catch((err) => console.log(err));

  res
    .status(200)
    .json({ message: "Carrinho do Usuário", cartProducts: userProducts });
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  const userLogged = await User.findByPk(req.userId).then(user => {
    return user.getCart();
  }).then(cart => {
    return cart.getProducts({ where: { id: prodId } })
  }).then(products => {
    const product = products[0]

    if (!product) {
      return res
        .status(404)
        .json({ message: "Produto não existe no carrinho!!" });
    }

    product.cartItem.destroy(); // Apaga apenas da tabela intermediária
  }).then(result => {
    res
      .status(200)
      .json({ message: "Produto excluído com sucesso!", data: result });

  }).catch(err => console.log(err))
}


//Pegar todos os CartItem e colocar no Order
exports.postOrder = async (req, res, next) => {
  let userLogged;

  const userProducts = await User.findByPk(req.userId)
    .then((user) => {
      userLogged = user;
      return user.getCart();
    })

    .then((cart) => {
      console.log(cart);
      return cart.getProducts();
    })
    .then((products) => {
      console.log(products);

      return userLogged.createOrder().then((order) => {
        order.addProducts(
          products.map((product) => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
          })
        );
      });
    })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
