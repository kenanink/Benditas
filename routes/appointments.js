const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middleware/auth");

// Crear cita (cliente logueado)
router.post("/", auth, appointmentController.create);

// Ver citas (cliente ve las suyas, admin todas)
router.get("/", auth, appointmentController.getAll);

// Cambiar estado de una cita (solo admin)
router.put("/:id/status", auth, appointmentController.updateStatus);

module.exports = router;
