//Modulos internos
const express = require("express");
const router = express.Router();
const usuario = require("../controller/usuario");
const auth = require("../middleware/auth");
// rutas para el registro y el inicio de session

router.post("/registro", usuario.registro);
router.post("/login", usuario.login);
module.exports = router;
