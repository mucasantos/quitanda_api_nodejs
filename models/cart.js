const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db_connect");

const Cart = sequelize.define(
  "cart",{

    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    }
  })

  module.exports = {
    sequelize,
    Cart,
  };
  