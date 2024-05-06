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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
   // nutritions: {
   //   type: DataTypes.STRING,
   //   allowNull: false,
      
  //  },
   
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
   // measure: {
   //   type: DataTypes.STRING,
   //   allowNull: false,
   //   validate: {
   //     notEmpty: true,
   //     max: 50,
   //   },
    //},
    review: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
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
