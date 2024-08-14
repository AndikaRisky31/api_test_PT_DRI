import mysql from 'mysql2/promise';

// Buat koneksi ke MySQL server
const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port : 3306,
      user: 'root', // Ganti dengan username database Anda
      password: '' // Ganti dengan password database Anda
    });
    return connection;
  } catch (error) {
    console.error('Error creating connection:', error);
    throw error;
  }
};

// Fungsi untuk membuat database dan tabel
const createDatabaseAndTables = async () => {
  const connection = await createConnection();

  // Query untuk membuat database
  const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS PT_DRI';
  
  // Query untuk menggunakan database yang baru dibuat
  const useDatabaseQuery = 'USE PT_DRI';

  // Query untuk membuat tabel customer
  const createCustomerTable = `
    CREATE TABLE IF NOT EXISTS customer (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      level ENUM('warga', 'juragan', 'sultan', 'konglomerat') NOT NULL,
      favorite_menu VARCHAR(255),
      is_deleted BOOLEAN DEFAULT FALSE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  // Query untuk membuat tabel product
  const createProductTable = `
    CREATE TABLE IF NOT EXISTS product (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price FLOAT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  // Query untuk membuat tabel order
  const createOrderTable = `
    CREATE TABLE IF NOT EXISTS \`order\` (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customer_id INT,
      total_amount FLOAT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customer(id)
    )
  `;

  // Query untuk membuat tabel order_item
  const createOrderItemTable = `
    CREATE TABLE IF NOT EXISTS order_item (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT,
      product_id INT,
      quantity INT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES \`order\`(id),
      FOREIGN KEY (product_id) REFERENCES product(id)
    )
  `;

  try {
    // Buat database jika belum ada
    await connection.query(createDatabaseQuery);
    console.log('Database PT_DRI created successfully.');

    // Gunakan database yang baru dibuat
    await connection.query(useDatabaseQuery);

    // Buat tabel-tabel
    await connection.query(createCustomerTable);
    console.log('Customer table created successfully.');

    await connection.query(createProductTable);
    console.log('Product table created successfully.');

    await connection.query(createOrderTable);
    console.log('Order table created successfully.');

    await connection.query(createOrderItemTable);
    console.log('Order item table created successfully.');
  } catch (error) {
    console.error('Error creating database or tables:', error);
  } finally {
    await connection.end();
  }
};

createDatabaseAndTables();
