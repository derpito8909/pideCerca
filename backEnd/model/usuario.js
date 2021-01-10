// crear el esquema para los usuarios
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const usuarioEsquema = new mongoose.Schema({
	nombreUsuario: {
		type: String,
		unique: true,
		required: true,
	},
	nombre: {
		type: String,
		required: true,
	},
	localidad: String,
	hash: String,
	salt: String,
});
// metodo para encriptar la contraseña que digite el usuario
usuarioEsquema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString("hex");
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};
// metodo para validar la contraseña que digite el usuario con el hash que se tiene en la BD
usuarioEsquema.methods.validPassword = function (password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");	
	return this.hash === hash;
};
// metodo para generar el JWT
usuarioEsquema.methods.generateJWT = function () {
	const expiracion = new Date();
	expiracion.setDate(expiracion.getDate() + 7);
	return jwt.sign(
		{
			_id: this._id,
			nombreUsuario: this.nombreUsuario,			
			expiracion: parseInt(expiracion.getTime() / 1000, 10),
		},
		process.env.JWT_SECRET
	);
};
const Usuario = mongoose.model("usuario", usuarioEsquema);
module.exports.Usuario = Usuario;
