const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db_connect");
const { User } = require("./user");
const { Product } = require("./product");

const Favorite = sequelize.define(
  "favorite",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  Favorite,
};
