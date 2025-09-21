// routes/users.js
const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');

const router = express.Router();

// Validaciones
const validateUser = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Debe ser un correo válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Registro (público)
router.post('/', validateUser, userController.create);

// Perfil (logueado)
router.get('/me', auth, userController.getProfile);

// Admin: ver todos
router.get('/', auth, authorizeRoles('admin'), userController.getAll);

// Admin: ver usuario por ID
router.get('/:id', auth, authorizeRoles('admin'), userController.getById);

// Admin: actualizar usuario
router.put('/:id', auth, authorizeRoles('admin'), userController.update);

// Admin: eliminar usuario
router.delete('/:id', auth, authorizeRoles('admin'), userController.remove);

module.exports = router;
