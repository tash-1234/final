const mysql = require('mysql');
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tenants"
});

module.exports = conn;