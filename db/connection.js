import mysql from 'mysql2/promise';

const createDatabaseIfNotExists = async () => {
  // Koneksi ke MySQL tanpa memilih database
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: ''
  });

  // Buat database jika tidak ada
  await connection.query('CREATE DATABASE IF NOT EXISTS PT_DRI');
  await connection.end();
};

const initializeConnection = async () => {
  // Pastikan database ada
  await createDatabaseIfNotExists();

  // Koneksi ke database yang sudah ada
  return mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'PT_DRI'
  });
};

const connection = await initializeConnection();

export default connection;