// Importamos Express y creamos el router
const express = require("express");
const router = express.Router();

// Importamos los controladores
const { registerUser, loginUser } = require("../controllers/auth.controller");

// Definimos las rutas
router.post("/register", registerUser);
router.post("/login", loginUser);

// Exportamos el router
module.exports = router;
