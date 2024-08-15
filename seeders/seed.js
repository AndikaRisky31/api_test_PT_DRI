import { seedCustomers } from './seed_customers.js';
import { seedOrders,seedPendingOrders } from './seed_orders.js';
import { seedProducts } from './seed_products.js';
import connection from '../db/connection.js';

const runSeeders = async () => {
    try {
        // Awal koneksi
        await connection.query('SET FOREIGN_KEY_CHECKS = 0'); // Disable FK checks temporarily if needed

        await seedProducts();
        await seedCustomers();
        await seedOrders();
        await seedPendingOrders();

        console.log('All seeders executed successfully.');
    } catch (error) {
        console.error('Error running seeders:', error.message);
    } finally {
        await connection.query('SET FOREIGN_KEY_CHECKS = 1'); // Re-enable FK checks if disabled
        await connection.end(); // Pastikan koneksi ditutup setelah semua operasi selesai
    }
};

runSeeders();

