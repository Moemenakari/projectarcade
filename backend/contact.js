const express = require("express");
const db = require("./db");

const contact = express.Router();

// Add Contact Message
contact.post("/addContact", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error Adding Contact" });
    }
    res.json({ message: "Message sent successfully" });
  });
});

// Get All Contacts
contact.get("/contact", (req, res) => {
  const sql = `SELECT * FROM contacts ORDER BY created_at DESC`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching contacts" });
    }
    res.json(result);
  });
});

// Delete Contact
contact.delete("/contact/:id", (req, res) => {
  const contactId = req.params.id;
  const sql = `DELETE FROM contacts WHERE id = ?`;
  db.query(sql, [contactId], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error Deleting Contact from DB" });
    }
    res.json({ message: "Deleted successfully" });
  });
});

module.exports = contact;
