import connection from '../db/connection.js';

export const getCustomers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sortBy = 'name', order = 'asc' } = req.query;
    const offset = (page - 1) * limit;

    const [[{ total_customers }]] = await connection.query(`
      SELECT COUNT(*) as total_customers 
      FROM customers 
      WHERE is_delete = false
    `);

    const total_pages = Math.ceil(total_customers / limit);

    const validSortBy = ['name', 'level', 'favorite_menu', 'total_transaction'];
    const sortColumn = validSortBy.includes(sortBy) ? sortBy : 'name'; // Default ke kolom 'name'

    const validOrder = ['asc', 'desc'];
    const sortOrder = validOrder.includes(order) ? order : 'asc'; // Default ke urutan 'asc'

    const [customers] = await connection.query(`
      SELECT 
        customers.id,
        customers.name, 
        customers.level,
        customers.favorite_menu,
        COALESCE(SUM(succes_orders.quantity * products.price), 0) as total_transaction 
      FROM customers 
      LEFT JOIN succes_orders ON customers.id = succes_orders.customer_id 
      LEFT JOIN products ON succes_orders.product_id = products.id 
      WHERE customers.is_delete = false 
      GROUP BY customers.id 
      ORDER BY 
        CASE 
          WHEN '${sortColumn}' = 'name' THEN customers.name
          WHEN '${sortColumn}' = 'level' THEN customers.level
          WHEN '${sortColumn}' = 'favorite_menu' THEN customers.favorite_menu
          WHEN '${sortColumn}' = 'total_transaction' THEN COALESCE(SUM(succes_orders.quantity * products.price), 0)
          ELSE customers.name
        END ${sortOrder}
      LIMIT ? OFFSET ?`, [parseInt(limit), parseInt(offset)]
    );

    res.json({ 
      page: parseInt(page),
      total_pages,
      customers,
    });
  } catch (error) {
    next(error);
  }
};

export const addCustomer = async (req, res, next) => {
    try {
        const { name, level } = req.body;
        await connection.query(`INSERT INTO customers (name, level) VALUES (?, ?)`, [name, level]);
        res.status(201).json({ message: 'Customer added successfully.' });
    } catch (error) {
        next(error);
    }
};

export const getCustomerDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [[customer]] = await connection.query(`SELECT * FROM customers WHERE id = ? AND is_delete = false`, [id]);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }

        const [orders] = await connection.query(`
            SELECT products.name, succes_orders.quantity 
            FROM succes_orders 
            JOIN products ON succes_orders.product_id = products.id 
            WHERE succes_orders.customer_id = ?`, [id]);

        res.json({ customer, orders });
    } catch (error) {
        next(error);
    }
};

export const updateOrderQuantity = async (req, res, next) => {
    try {
        const { customerId, productId } = req.params;
        const { quantity } = req.body;

        await connection.query(`
            UPDATE succes_orders 
            SET quantity = ? 
            WHERE customer_id = ? AND product_id = ?`, [quantity, customerId, productId]);

        res.json({ message: 'Order quantity updated successfully.' });
    } catch (error) {
        next(error);
    }
};

export const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        await connection.query(`UPDATE customers SET is_delete = true WHERE id = ?`, [id]);
        res.json({ message: 'Customer deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
