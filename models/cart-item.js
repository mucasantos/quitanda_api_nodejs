const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db_connect");

const CartItem = sequelize.define(
  "cartItem",{

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
    CartItem,
  };
  