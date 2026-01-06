const express = require("express");
const db = require("./db");

const migrate = express.Router();

// Migration endpoint to create contacts table
migrate.get("/migrate/create-contacts-table", (req, res) => {
  const sql = `CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ 
        message: "Migration failed", 
        error: err.message 
      });
    }
    res.json({ 
      message: "Migration successful - contacts table created",
      result: result
    });
  });
});

// Migration endpoint to update database schema
migrate.get("/migrate/update-image-column", (req, res) => {
  const sql = "ALTER TABLE products MODIFY COLUMN image LONGTEXT";
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ 
        message: "Migration failed", 
        error: err.message 
      });
    }
    res.json({ 
      message: "Migration successful - image column updated to LONGTEXT",
      result: result
    });
  });
});

module.exports = migrate;
