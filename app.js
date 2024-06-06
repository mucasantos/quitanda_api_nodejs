const express = require("express");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes");
const prodRoutes = require("./routes/productRoutes");
const shopRoutes = require("./routes/shopRoutes")
const sequelize = require("./services/db_connect");
const errors = require("./middleware/errors");
const { Product } = require("./models/product");
const { User } = require("./models/user");
const { Favorite } = require("./models/favorite");
const { Cart } = require("./models/cart");
const { CartItem } = require("./models/cart-item");
const { Order } = require("./models/order");
const { OrderItem } = require("./models/order-item");

class App {
    constructor() {
        this.server = express()
        this.dbConnect();
        this.middlewares();
        this.routes();
        this.relations();
    }
//Métodos
    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use(userRoutes);
        this.server.use(prodRoutes)
        this.server.use(shopRoutes)
        this.server.use(errors);
    }
    relations() {
        //No caso de Admin, salvar o Id dele. Por isso temos essa relação
        Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
        User.hasMany(Product)

        Favorite.belongsTo(User)
        Favorite.belongsTo(Product)

        //Relação carrinho
        User.hasOne(Cart)
        Cart.belongsTo(User) //Optional
        Cart.belongsToMany(Product, {through: CartItem})
        Product.belongsToMany(Cart, {through: CartItem})

        Order.belongsTo(User)
        User.hasMany(Order)
        Order.belongsToMany(Product, {through: OrderItem})      
    }
    async dbConnect() {
        await sequelize.authenticate();
        await sequelize.sync() //({alter: true})//({force: true})
    }
}

module.exports = new App().server;