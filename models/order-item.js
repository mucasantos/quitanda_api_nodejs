const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db_connect");

//é uma tabela entre user e multiplos produtos

const OrderItem = sequelize.define(
  "orderItem",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    }, 
    quantity: DataTypes.INTEGER
  })

  module.exports = {
    sequelize,
    OrderItem,
  };
