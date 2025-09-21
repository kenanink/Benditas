const Appointment = require("../models/Appointment");

// Crear cita (cliente)
exports.create = async (req, res) => {
  try {
    const { service_id, appointment_date, appointment_time } = req.body; // 👈 ahora también se recibe la hora

    if (!appointment_time) {
      return res.status(400).json({ error: "La hora de la cita es obligatoria" });
    }

    const newId = await Appointment.create({
      user_id: req.user.id,
      service_id,
      appointment_date,
      appointment_time, // 👈 se inserta en la DB
      status: "pendiente"
    });

    res.json({ message: "Cita creada", id: newId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const appointments = await Appointment.findAll(req.user);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validar que el rol sea admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Solo admin puede cambiar el estado" });
    }

    // Validar que el estado enviado sea uno permitido
    const estadosPermitidos = ["pendiente", "confirmada", "cancelada", "atendida"];
    if (!estadosPermitidos.includes(status)) {
      return res.status(400).json({ error: "Estado inválido" });
    }

    const updated = await Appointment.updateStatus(id, status);

    if (!updated) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.json({ message: `Estado de la cita actualizado a '${status}'` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
