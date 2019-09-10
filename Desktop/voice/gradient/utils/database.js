const mysql = require('mysql2');

var pool = mysql.createPool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  connectionLimit : 100
});

module.exports = pool.promise();
