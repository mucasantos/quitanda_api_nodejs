const { Product } = require("../models/product")
const { Category } = require("../models/category")
const { Favorite } = require("../models/favorite")

exports.getProducts = async (req, res, next) => {

    const products = await Product.findAll();
    res.status(200).json({ products: products })

}

exports.getProduct = async (req, res, next) => {

    const id = req.params.id

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado..." })
        }

        res.status(200).json({ product: product })

    } catch (error) {
        console.log("Catch!")

        next(error);
    }


}

exports.getProductByCategory = async (req, res, next) => {

    const id = req.params.id
    const product = await Product.findAll({ where: { categoryId: id } });

    if (!product) {
        return res.status(404).json({ message: "Produto não encontrado..." })
    }
    res.status(200).json({ products: product })
}

exports.getCategories = async (req, res, next) => {
    const categories = await Category.findAll();

    res.status(200).json({ categories: categories })

}

exports.createProduct =  (req, res, next) => {
    console.log(req.body)

    if (
        !req.isAdmin) {
        const error = new Error("Somente Administradores podem criar produtos!")
        error.statusCode = 403;
        throw error;
    }
    const product = new Product(req.body)

    product.userId = req.userId;

     product.save()
        .then(result => res.status(201).json({ message: "produto criado com sucesso!!", product: result })

        ).catch(err => res.status(500).json({ message: "Erro ao salvar", error: err }))


    console.log(product);

}

exports.createCategory =  (req, res, next) => {

    if (
        !req.isAdmin) {
        const error = new Error("Somente Administradores podem criar categorias!")
        error.statusCode = 403;
         error;
    }
    console.log(req.body)
    const category = new Category(req.body)

     category.save()
        .then(result => res.status(201).json({ message: "Categoria criada com sucesso!!", product: result })

        ).catch(err => res.status(500).json({ message: "Erro ao salvar", error: err }))


    console.log(category);

}


exports.favoriteProduct = async (req, res, next) => {
    console.log(req.body)
    const favorite = new Favorite(req.body)

    await favorite.save()
        .then(result => res.status(201).json({ message: "produto criado com sucesso!!", product: result })

        ).catch(err => res.status(500).json({ message: "Erro ao salvar", error: err }))


    console.log(favorite);

}