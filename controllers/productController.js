const { Product } = require("../models/product")
const { Category } = require("../models/category")


exports.getProducts = async (req, res, next) => {
    const products = await Product.findAll();

    res.status(200).json({ products: products })

}

exports.getProduct = async (req, res, next) => {

    const id = req.params.id
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({ message: "Produto não encontrado..." })
    }
    res.status(200).json({ product: product })
}

exports.getProductByCategory = async (req, res, next) => {

    const id = req.params.id
    const product = await Product.findAll({where: {categoryId: id}});

    if (!product) {
        return res.status(404).json({ message: "Produto não encontrado..." })
    }
    res.status(200).json({ products: product })
}

exports.getCategories = async (req, res, next) => {
    const categories = await Category.findAll();

    res.status(200).json({ categories: categories })

}

exports.createProduct = async (req, res, next) => {
    console.log(req.body)
    const product = new Product(req.body)


    await product.save()
        .then(result => res.status(201).json({ message: "produto criado com sucesso!!", product: result })

        ).catch(err => res.status(500).json({ message: "Erro ao salvar", error: err }))


    console.log(product);

}

exports.createCategory = async (req, res, next) => {
    console.log(req.body)
    const category = new Category(req.body)

    await category.save()
        .then(result => res.status(201).json({ message: "Categoria criada com sucesso!!", product: result })

        ).catch(err => res.status(500).json({ message: "Erro ao salvar", error: err }))


    console.log(category);

}