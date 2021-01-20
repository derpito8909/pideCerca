const { Usuario } = require("../model/usuario");
const passport = require("passport");
const error_types = require("./error_types");

//controlador para el registro del usuario
const registro = (req, res, next) => {
	Usuario.findOne({ correo: req.body.correo })
		.then((data) => {
			if (data) {
				throw new error_types.InfoError("Este correo del usuario ya existe");
			} else {
				const usuario = new Usuario();
				usuario.nombre = req.body.nombre;
				usuario.correo = req.body.correo;
				usuario.setPassword(req.body.clave);
				usuario.localidad = req.body.localidad;
				return usuario.save();
			}
		})
		.then((data) => {
			res.status(200).send("Registro Exitoso")
		})
		.catch((err) => {
			next(err);
		});
};
//controlador para el inicio de sesion del usuario
const login = (req, res, next) => {
	passport.authenticate("local", { session: false }, (error, user) => {		
		if (error || !user) {
			next(new error_types.Error404("Usuario o Contraseña incorrectos"));
		} else {
			const token = user.generateJWT();
			res.status(200).json({ token });
		}
	})(req, res);
};
module.exports = {
	registro,
	login,
};
