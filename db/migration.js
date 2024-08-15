import connection from './connection.js';

const migration = async () => {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                level ENUM('warga', 'juragan', 'sultan', 'konglomerat') DEFAULT 'warga',
                favorite_menu VARCHAR(255),
                is_delete BOOLEAN DEFAULT false,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price FLOAT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS succes_orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                customer_id INT,
                product_id INT,
                quantity INT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (customer_id) REFERENCES customers(id),
                FOREIGN KEY (product_id) REFERENCES products(id)
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS pending_orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                customer_id INT,
                product_id INT,
                quantity INT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (customer_id) REFERENCES customers(id),
                FOREIGN KEY (product_id) REFERENCES products(id)
            );
        `);

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error.message);
    } finally {
        await connection.end();
    }
};

migration();
