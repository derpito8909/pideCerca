require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
require("./config/passport");
const usuario = require("./router/usuario");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());
//inicializar el autorizacion por passport
app.use(passport.initialize());
app.use(cors());
app.use("/api/", usuario);
app.use(auth.errorHandler);
app.use(auth.notFoundHandler);

// Puerto para ejecutar nuestro servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Ejecutando en el puerto " + port));
// conexion con Mongo
mongoose
	.connect("mongodb://localhost/footballLeague", {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Conexion a Mongo: online"))
	.catch((error) => console.log("Conexion a Mongo:Offline"));