const { check } = require("express-validator")

module.exports = {
    validateEmail: check("email")
        .isEmail()
        .withMessage("Digite um email válido!"),

    validatePassword: check("password")
        .isLength({ min: 10 })
        .withMessage("A senha precisa ter pelo menos 10 caracters"),

    validateName: check("name")
        .isLength({ min: 5 })
        .withMessage("O nome precisa de pelo menos 5 caracters!"),


    validateCity: check("city")
        .isLength({ min: 5 })
        .withMessage("O nome da cidade não é válido..."),

    validateState: check("state")
        .isLength({ min: 2 })
        .withMessage("O nome do estado de pelo menos 2 caracters!"),
}