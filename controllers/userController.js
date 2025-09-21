// controllers/userController.js
// controllers/userController.js
const db = require('../db/connection');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Crear usuario (registro)
exports.create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Verificar si ya existe
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role || 'cliente']
    );

    res.status(201).json({ message: 'Usuario creado', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario', details: err.message });
  }
};

// Obtener todos los usuarios (solo admin)
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, role FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener usuario por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);

    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// Obtener perfil del usuario logueado
exports.getProfile = async (req, res) => {
  try {
    const { id } = req.user; // viene del token
    const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);

    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

// Actualizar usuario
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    let query = 'UPDATE users SET name = ?, email = ?, role = ?';
    let values = [name, email, role || 'cliente'];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password = ?';
      values.push(hashedPassword);
    }

    query += ' WHERE id = ?';
    values.push(id);

    await db.query(query, values);
    res.json({ message: 'Usuario actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
