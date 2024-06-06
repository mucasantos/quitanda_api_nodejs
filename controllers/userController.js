const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.userLogin = (req, res, next) => {
  const { email, password } = req.body;

  var loadedUser;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        const error = new Error("Usuário não encontrado ...");
        error.statusCode = 401;
        next(error);
      }
      loadedUser = user;
      return bcrypt.compare(password, loadedUser.password);
    })
    .then((passEquals) => {
      if (!passEquals) {
        const error = new Error("Email ou senha inválida ...");
        error.statusCode = 401;
        next(error);
      }
      loadedUser.password = undefined;

      //Vamos gerar o token para ele!
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id.toString(),
          isAdmin: loadedUser.isAdmin,
        },
        "MinhaChaveJWT@2024Senai",
        { expiresIn: "4h" }
      );
      res
        .status(200)
        .json({
          message: "Usuário logado com sucesso!",
          user: loadedUser,
          token: token,
        });
    })
    .catch((err) => next(err));
};

exports.userSignUp = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //Criei um objeto do tipo ERROR e adicionei (com os nomes que escolhi)
    //mais duas propriedades: data e statusCode
    const error = new Error("Falha de validação");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { email, password } = req.body;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        const error = new Error("Usuário já existe na base de dados!");
        error.statusCode = 403;
        return next(error);
      }

      let newUser;

      bcrypt
        .hash(password, 12)
        .then((passEncripted) => {
          const user = new User(req.body);
          user.isAdmin = false; //garante que o user não seja admin na criação
          user.password = passEncripted;
          user.image =
            "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png";

          return user.save();
        })
        .then((user) => {
          user.password = undefined;

          newUser = user;

          //Este método é dado pelo Sequelize!
          return user.createCart();
        })
        .then((user) =>
          res
            .status(200)
            .json({ message: "Usuário cadastrado com sucesso!", user: newUser })
        )
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => next(err));
};
