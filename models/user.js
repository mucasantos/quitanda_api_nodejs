const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db_connect");

const User = sequelize.define(
  "user",
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
      allowNull: true,
      
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
   
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 50,
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
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
  User,
};
