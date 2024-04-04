const { Router } = require("express");
const routes = new Router();

routes.post('/login', (req, res)=> {
    res.json({msg: "Tudo ok.."})
})

routes.post('/signup', (req, res)=> {
    res.json({msg: "Tudo ok.."})
})

module.exports = routes