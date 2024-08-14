import { connection } from '../db/connection.js';

// Controller untuk menambahkan produk baru
export const addProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const [result] = await connection.execute(
      'INSERT INTO product (name, price) VALUES (?, ?)',
      [name, price]
    );
    res.status(201).json({ id: result.insertId, name, price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller untuk mendapatkan semua produk
export const getProducts = async (req, res) => {
  try {
    const [products] = await connection.execute('SELECT * FROM product');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
