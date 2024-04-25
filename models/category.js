const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db_connect");
const { Product } = require("./product");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = {
  sequelize,
  Category,
};
