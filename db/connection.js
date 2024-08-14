import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    port:3306,
    user: 'root',
    password: '',
    database: 'PT_DRI'
});

export default connection;