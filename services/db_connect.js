const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
//const sequelize = new Sequelize("postgres://postgres:postgres@postgres:5432/frexco");
const sequelize = new Sequelize('quitanda', 'root', 'lipetoni', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;