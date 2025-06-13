const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',            
  password: '',            
  database: 'admin_pembelian_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Terhubung ke database!');
});

module.exports = connection;
