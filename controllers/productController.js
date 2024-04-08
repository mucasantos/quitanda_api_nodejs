const {Product} = require("../models/product")
const {Category} = require("../models/category")


exports.getProducts =async (req, res, next)=> {
  const products = await  Product.findAll();

  res.status(200).json({products: products})

}

exports.getCategories =async (req, res, next)=> {
    const categories = await  Category.findAll();
  
    res.status(200).json({categories: categories})
  
  }