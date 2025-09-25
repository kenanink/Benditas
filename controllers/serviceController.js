// controllers/serviceController.js
const db = require('../db/connection');

// Obtener todos los servicios
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services');
    res.json(rows);
  } catch (error) {
    console.error("Error en getAll services:", error);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
};

// Obtener servicio por ID
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error en getById services:", error);
    res.status(500).json({ error: "Error al obtener servicio" });
  }
};

// Crear servicio
exports.create = async (req, res) => {
  try {
    const { name, description, price, duration_minutes } = req.body;
    const [result] = await db.query(
      'INSERT INTO services (name, description, price, duration_minutes) VALUES (?, ?, ?, ?)',
      [name, description, price, duration_minutes || 60]
    );
    res.status(201).json({ 
      id: result.insertId, 
      name, 
      description, 
      price, 
      duration_minutes: duration_minutes || 60 
    });
  } catch (error) {
    console.error("Error en create service:", error);
    res.status(500).json({ error: "Error al crear servicio" });
  }
};

// Actualizar servicio
exports.update = async (req, res) => {
  try {
    const { name, description, price, duration_minutes } = req.body;
    const [result] = await db.query(
      'UPDATE services SET name=?, description=?, price=?, duration_minutes=? WHERE id=?',
      [name, description, price, duration_minutes, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json({ 
      id: req.params.id, 
      name, 
      description, 
      price, 
      duration_minutes 
    });
  } catch (error) {
    console.error("Error en update service:", error);
    res.status(500).json({ error: "Error al actualizar servicio" });
  }
};

// Eliminar servicio
exports.remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM services WHERE id=?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json({ message: "Servicio eliminado" });
  } catch (error) {
    console.error("Error en remove service:", error);
    res.status(500).json({ error: "Error al eliminar servicio" });
  }
};