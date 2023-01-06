const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aditya_motor",
});

db.connect();

module.exports = db;
