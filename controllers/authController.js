const db = require('../db/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'supersecreto',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ error: 'Error en login', details: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Check if email already exists
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'cliente']
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: result.insertId, email, role: 'cliente' },
      process.env.JWT_SECRET || 'supersecreto',
      { expiresIn: '1h' }
    );

    // Return success response
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: result.insertId,
        name,
        email,
        role: 'cliente'
      }
    });

  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ error: 'Error interno del servidor', details: err.message });
  }
};