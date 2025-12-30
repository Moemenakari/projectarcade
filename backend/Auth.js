const express = require("express");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const auth = express.Router();

auth.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Please provide username and password");
  }
  const hashedPassword = await bycrypt.hash(password, 8);
  const query =
    "INSERT INTO users (username, password, is_admin) VALUES (?, ? , 0)";
  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).send("Error registering user");
    }
    res.status(201).json({ message: "User registered successfully" });
  });
});

auth.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Please provide username and password");
  }
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).send("Error logging in");
    }
    if (results.length === 0) {
      return res.status(404).send("User not found");
    }
    const user = results[0];
    const passwordIsValid = await bycrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send("Invalid password");
    }
    const secretKey = process.env.JWT_SECRET || "fallback_secret_key_dev_only";
    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: 86400, // 24 hours
    });
    res.status(201).json({
      auth: true,
      token: token,
      user: { id: user.id, username: user.username,is_admin: user.is_admin },
    });
  });
});

//Get Users
auth.get("/users", (req, res) => {
  const sql = `SELECT * FROM users WHERE is_admin = 0`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching Users" });
    }
    res.json(result);
  });
});

//Delete Users
auth.delete("/users/:id",(req,res) => {
  const userId = req.params.id;
  const sql =`DELETE FROM users WHERE id = ?`;
  db.query(sql,[userId],(err,result) => {
    if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Error Deleting user from DB" });
      }
      res.json({ message: "Deleted successfully" });
  })
})

//Count of users
auth.get("/stats/user", (req,res) => {
  const sql = `SELECT COUNT(*) AS total_users FROM users`;
  db.query(sql,(err,userData) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error counting users" });
    }

    res.json({usersCount:userData[0].total_users});
  })
})

module.exports = auth;
