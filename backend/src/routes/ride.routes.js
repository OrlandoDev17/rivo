// Importamos Express y creamos el router
const express = require("express");
const router = express.Router();

// Importamos los controladores
const {
  createRide,
  acceptRide,
  completeRide,
  getDriverHistory,
  getPendingRides,
} = require("../controllers/ride.controller");

// Definimos las rutas
router.post("/", createRide);
router.put("/accept", acceptRide);
router.put("/complete", completeRide);
router.get("/history", getDriverHistory);
router.get("/pending", getPendingRides);

// Exportamos el router
module.exports = router;
