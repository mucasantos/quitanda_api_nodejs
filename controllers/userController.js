const { User } = require("../models/user")

exports.userLogin = (req, res, next) => {

    const { email, password } = req.body;

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user){
                const error = new Error("Usuário não encontrado ...")
                error.statusCode = 401
                next(error)
            }
            if (user.password != password){
                const error = new Error("Email ou senha inválida ...")
                error.statusCode = 401
                next(error)
            }
            user.password = undefined;
            res.status(200).json({ message: "Usuário logado com sucesso!", user: user })  
        })
        .catch(err => next(err))
}

exports.userSignUp = (req, res, next) => {

    const email = req.body.email
    User.findOne({ where: { email: email } })
        .then(user => {
            if (user){
                const error = new Error("Usuário já existe na base de dados!")
                error.statusCode = 403
                next(error)
            }
        })
        .catch(err => next(err))

    const user = new User(req.body)
    user.isAdmin = false; //garante que o user não seja admin na criação

    user.save()
        .then(result => {
            result.password = undefined;
            res.status(200).json({ message: "Usuário cadastrado com sucesso!", user: result })

        })
        .catch(error => next(error))
}