//se crea el sistema para la autenticacion
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const { Usuario } = require("../model/usuario");

// configuracion de la estrategia local
passport.use(
	new LocalStrategy(
		{
			usernameField: "correo",
			passwordField: "clave",
			session: false,
		},
		(username, password, done) => {
			Usuario.findOne({ correo: username })
				.then((data) => {
					if (data == null) return done(null, false);
					else if (!data.validPassword(password)) {
						return done(null, false);
					}
					return done(null, data);
				})
				.catch((err) => done(err, null));
		}
	)
);
/** config de estrategia jwt de passport ******/
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use(
	new JwtStrategy(opts, (jwt_payload, done) => {
		console.log("ejecutando *callback verify* de estategia jwt");
		User.findOne({ _id: jwt_payload.sub })
			.then((data) => {
				if (data === null) {
					//no existe el usuario
					//podríamos registrar el usuario
					return done(null, false);
				} else return done(null, data);
				/*encontramos el usuario así que procedemos a devolverlo para
        inyectarlo en req.user de la petición en curso*/
			})
			.catch((err) => done(err, null)); //si hay un error lo devolvemos
	})
);
