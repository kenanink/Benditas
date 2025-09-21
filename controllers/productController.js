// controllers/productController.js
const db = require('../db/connection');

// Obtener todos los productos
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error("Error en getAll:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// Obtener un producto por ID
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error en getById:", error);
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

// Crear producto
exports.create = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const [result] = await db.query(
      'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
      [name, description, price]
    );
    res.status(201).json({ id: result.insertId, name, description, price });
  } catch (error) {
    console.error("Error en create:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

// Actualizar producto
exports.update = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const [result] = await db.query(
      'UPDATE products SET name=?, description=?, price=? WHERE id=?',
      [name, description, price, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ id: req.params.id, name, description, price });
  } catch (error) {
    console.error("Error en update:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

// Eliminar producto
exports.remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM products WHERE id=?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error en remove:", error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};
