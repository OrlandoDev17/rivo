const express = require("express");
const router = express.Router();
const {
  createRide,
  acceptRide,
  completeRide,
  getPendingRides,
  getDriverHistory,
} = require("../controllers/ride.controller");

// 🧍 Cliente solicita un viaje
router.post("/", createRide);

// 🚙 Conductor acepta el viaje
router.put("/accept", acceptRide);

// ✅ Conductor completa el viaje
router.put("/complete", completeRide);

// ✅ Conductor recibe viajes pendientes
router.get("/pending", getPendingRides);

// ✅ Conductor recibe el historial de viajes
router.get("/history", getDriverHistory);

module.exports = router;
