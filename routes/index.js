// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'API Estética funcionando' }));

router.use('/api/products', require('./products'));
router.use('/api/services', require('./services'));
router.use('/api/users', require('./users'));
router.use('/api/auth', require('./auth'));
router.use("/api/appointments", require("./appointments"));

module.exports = router;
