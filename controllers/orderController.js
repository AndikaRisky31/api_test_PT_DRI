import connection from '../db/connection.js';

export const createOrder = async (req, res, next) => {
    try {
        const { customerId, productId, quantity } = req.body;

        await connection.query(`
            INSERT INTO pending_orders (customer_id, product_id, quantity) VALUES (?, ?, ?)`, 
            [customerId, productId, quantity]);

        res.status(201).json({ message: 'Order created successfully. Please confirm to move to success orders.' });
    } catch (error) {
        next(error);
    }
};

export const confirmOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [[pendingOrder]] = await connection.query(`SELECT * FROM pending_orders WHERE id = ?`, [id]);

        if (!pendingOrder) {
            return res.status(404).json({ message: 'Pending order not found.' });
        }

        await connection.query(`
            INSERT INTO succes_orders (customer_id, product_id, quantity) VALUES (?, ?, ?)`,
            [pendingOrder.customer_id, pendingOrder.product_id, pendingOrder.quantity]);

        await connection.query(`DELETE FROM pending_orders WHERE id = ?`, [id]);

        res.json({ message: 'Order confirmed and moved to success orders.' });
    } catch (error) {
        next(error);
    }
};
