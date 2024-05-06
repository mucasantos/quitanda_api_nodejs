const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db_connect");

//é uma tabela entre user e multiplos produtos

const Order = sequelize.define(
  "order",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    }

  })

  module.exports = {
    sequelize,
    Order,
  };
