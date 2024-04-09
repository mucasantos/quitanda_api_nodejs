const express = require("express");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes");
const prodRoutes = require("./routes/productRoutes");
const sequelize = require("./services/db_connect");

class App {
    constructor(){
        this.server = express()
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    middlewares(){
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes(){
        this.server.use(userRoutes);
        this.server.use(prodRoutes)
    }

   async dbConnect(){
        await sequelize.authenticate();
        await sequelize.sync()// ({force: true})
    }
}

module.exports = new App().server;