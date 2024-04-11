const express = require("express");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes");
const prodRoutes = require("./routes/productRoutes");
const sequelize = require("./services/db_connect");
const errors = require("./middleware/errors")

class App {
    constructor() {
        this.server = express()

        this.dbConnect();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());

    }

    routes() {

       this.server.use(userRoutes);
        this.server.use(prodRoutes)
        this.server.use(errors);
    }

    async dbConnect() {
        await sequelize.authenticate();
        await sequelize.sync()// ({force: true})
    }
}

module.exports = new App().server;