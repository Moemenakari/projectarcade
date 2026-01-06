const express = require("express");
const db = require("./db");

const migrate = express.Router();

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
