import connection from '../db/connection.js';

export const seedOrders = async () => {
    try {
        // Pastikan data yang diperlukan ada di tabel sebelum melakukan insert
        await connection.query(`
            INSERT INTO succes_orders (customer_id, product_id, quantity) VALUES
            (1, 1, 2),
            (1, 2, 1),
            (2, 2, 3),
            (3, 3, 4);
        `);

        console.log('Orders seeded successfully.');
    } catch (error) {
        console.error('Seeding orders failed:', error.message);
    }
};

export const seedPendingOrders = async () => {
    try {
        // Pastikan data yang diperlukan ada di tabel sebelum melakukan insert
        await connection.query(`
            INSERT INTO pending_orders (customer_id, product_id, quantity) VALUES
            (1, 1, 2),
            (1, 2, 1),
            (2, 2, 3),
            (3, 3, 4);
        `);

        console.log('Pending orders seeded successfully.');
    } catch (error) {
        console.error('Seeding pending orders failed:', error.message);
    }
};
