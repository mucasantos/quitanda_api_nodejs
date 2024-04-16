const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    if(!req.get("Authorization")){
        const error = new Error("Necessário enviar o token!")
        error.statusCode = 401;
        throw error;
    }
    const token = req.get("Authorization").split(' ')[1]

    let decodedToken

    try {
        decodedToken = jwt.verify(token, "MinhaChaveJWT@2024Senai",
        )
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    if(!decodedToken) {
        const error = new Error("Usuário não autenticado!")
        error.statusCode = 401;
        throw error;
    }

    //adicionei ao objeto req, a propriedade userId e isAdmin
    req.userId = decodedToken.userId;
    req.isAdmin = decodedToken.isAdmin
    next();
}