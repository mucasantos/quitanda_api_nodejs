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
exports.createOrder = async (req, res, next) => {
  let userLogged;
  let fetchedCart;

  const userProducts = await User.findByPk(req.userId)
    .then((user) => {
      userLogged = user;
      return user.getCart();
    })

    .then((cart) => {
      fetchedCart = cart
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
    .then((result) => {
      //Apagar todos os produtos do Cart após gravar o pedido (order)

      return fetchedCart.setProducts(null)

    }).then(data => {
      res.status(200)
        .json({ "message": "Pedido Criado com sucesso!", data: data })
    })
    .catch((err) => console.log(err));
};

exports.getOrders = async (req, res, next) => {
  const userOrders = await User.findByPk(req.userId)
    .then(user => {
      return user.getOrders({ include: ['products'] }) //Devolve os produtos - por causa da relação entre eles
    })
    .then(orders => {

      res.status(200)
        .json({ "message": "Pedido Criado com sucesso!", orders: orders })

    }).catch(err => console.log(err))


}