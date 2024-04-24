const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "company",
});

//Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql Connected....");
});

module.exports = db;
