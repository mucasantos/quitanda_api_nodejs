const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db_connect");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        allowNull: false,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 50,
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
   
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 50,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);


module.exports = {
  sequelize,
  Product,
};
