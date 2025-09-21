// middleware/auth.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // formato "Bearer token"

  if (!token) return res.status(401).json({ error: 'Acceso denegado, token faltante' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecreto');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = authMiddleware;
