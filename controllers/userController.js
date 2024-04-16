const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


exports.userLogin = (req, res, next) => {

    const { email, password } = req.body;

    var loadedUser

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                const error = new Error("Usuário não encontrado ...")
                error.statusCode = 401
                next(error)
            }
            loadedUser = user
            return bcrypt.compare(password, loadedUser.password)
        }).then(passEquals => {
            if (!passEquals) {
                const error = new Error("Email ou senha inválida ...")
                error.statusCode = 401
                next(error)
            }
            loadedUser.password = undefined;

            //Vamos gerar o token para ele!
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser.id.toString(),
                    isAdmin: loadedUser.isAdmin
                },
                "MinhaChaveJWT@2024Senai",
                { expiresIn: "4h" }
            )
            res.status(200).json({ message: "Usuário logado com sucesso!", user: loadedUser, token: token, })

        })
        .catch(err => next(err))

}

exports.userSignUp = async (req, res, next) => {

    const { email, password } = req.body

    User.findOne({ where: { email: email } })
        .then(user => {
            if (user) {
                const error = new Error("Usuário já existe na base de dados!")
                error.statusCode = 403
                next(error)
            }
        })
        .catch(err => next(err))

    const passEncripted = await bcrypt.hash(password, 12)

    const user = new User(req.body)
    user.isAdmin = false; //garante que o user não seja admin na criação
    user.password = passEncripted;


    user.save()
        .then(result => {
            result.password = undefined;
            res.status(200).json({ message: "Usuário cadastrado com sucesso!", user: result })

        })
        .catch(error => next(error))
}