const express = require("express");
const router = new express.Router();
const db = require("../db/mySQLConnet");

//Create DB
router.get("/createDb", (req, res) => {
  let sql = "CREATE DATABASE company";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Database created...");
  });
});

//Create Table
router.get("/createusertable", (req, res) => {
  let sql =
    "CREATE TABLE user(id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255), Username VARCHAR(100), Password VARCHAR(100), isActive BOOLEAN)";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("POSST table created...");
  });
});

//Add User
router.post("/create-user", (req, res) => {
  let user = {
    Name: req.body.name,
    Username: req.body.username,
    Password: req.body.password,
    isActive: 1,
  };
  let sql = "INSERT INTO user SET ?";
  let query = db.query(sql, [user], (err, result) => {
    if (err) {
      res
        .status(500)
        .send({
          success: false,
          message: "Error occurred while creating user.",
        });
    } else {
      res
        .status(200)
        .send({ success: true, message: "User created successfully." });
    }
  });
});

//Check User
router.post("/auth", (req, res) => {
  let Username = req.body.username;
  let Password = req.body.password;
  let sql = "SELECT * FROM user WHERE username=? AND password=?";
  let query = db.query(sql, [Username, Password], (err, result) => {
    if (err || result.length < 1) {
      res.status(203).send({ user_exist: false });
    } else if (result.length > 0) {
      res.status(202).send({ user_exist: true, result });
    }
  });
});

//Check CheckExist
router.post("/check-exit", (req, res) => {
  let Username = req.body.username;
  let sql = "SELECT * FROM user WHERE username=?";
  let query = db.query(sql, [Username], (err, result) => {
    if (err || result.length < 1) {
      res.status(203).send({ user_exist: false });
    } else if (result.length > 0) {
      res.status(202).send({ user_exist: true });
    }
  });
});

//Get All User
router.get("/get-details", (req, res) => {
  let sql = "SELECT Name, Username, id FROM user";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
