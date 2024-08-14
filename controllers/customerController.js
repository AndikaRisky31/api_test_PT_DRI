import { connection } from '../db.js';

// Controller untuk menambahkan data customer baru
export const addCustomer = async (req, res) => {
  const { name, level, favorite_menu } = req.body;
  try {
    const [result] = await connection.execute(
      'INSERT INTO customer (name, level, favorite_menu) VALUES (?, ?, ?)',
      [name, level, favorite_menu]
    );
    res.status(201).json({ id: result.insertId, name, level, favorite_menu });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller untuk melihat detail data customer
export const getCustomerDetail = async (req, res) => {
  const customerId = req.params.id;
  try {
    const [customer] = await connection.execute(
      'SELECT * FROM customer WHERE id = ? AND is_deleted = FALSE',
      [customerId]
    );
    if (customer.length === 0) return res.status(404).json({ message: 'Customer not found' });

    const [orders] = await connection.execute(
      `SELECT o.id AS order_id, p.name AS product_name, oi.quantity
       FROM \`order\` o
       JOIN order_item oi ON o.id = oi.order_id
       JOIN product p ON oi.product_id = p.id
       WHERE o.customer_id = ?`,
      [customerId]
    );

    res.json({ customer: customer[0], orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller untuk menghapus data customer (soft delete)
export const deleteCustomer = async (req, res) => {
  const customerId = req.params.id;
  try {
    await connection.execute(
      'UPDATE customer SET is_deleted = TRUE WHERE id = ?',
      [customerId]
    );
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller untuk mendapatkan daftar customer dengan pagination
export const getCustomers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const [customers] = await connection.execute(
      'SELECT * FROM customer WHERE is_deleted = FALSE LIMIT ? OFFSET ?',
      [parseInt(limit), parseInt(offset)]
    );

    const [totalCount] = await connection.execute(
      'SELECT COUNT(*) AS count FROM customer WHERE is_deleted = FALSE'
    );

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: totalCount[0].count,
      customers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

