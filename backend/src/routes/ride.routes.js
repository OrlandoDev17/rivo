const express = require("express");
const router = express.Router();
const {
  createRide,
  acceptRide,
  completeRide,
  getPendingRides,
  getDriverHistory
} = require("../controllers/ride.controller");

// 🧍 Cliente solicita un viaje
router.post("/rides", createRide);

// 🚙 Conductor acepta el viaje
router.put("/rides/accept", acceptRide);

// ✅ Conductor completa el viaje
router.put("/rides/complete", completeRide);

// ✅ Conductor recibe viajes pendientes
router.get("/rides/pending", getPendingRides);

// ✅ Conductor recibe el historial de viajes
router.get("/rides/history", getDriverHistory);

module.exports = router;
