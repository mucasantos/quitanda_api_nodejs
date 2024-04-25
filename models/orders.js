const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db_connect");

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
