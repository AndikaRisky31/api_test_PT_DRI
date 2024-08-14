import connection from '../db/connection.js';

const seedOrders = async () => {
    try {
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
    } finally {
        await connection.end();
    }
};

seedOrders();
