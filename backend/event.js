const express = require("express");
const db = require("./db");

const event = express.Router();

//Add Event
event.post("/addEvent", (req, res) => {
  const { name, email, phone, type, date, attendee, price, note } = req.body;
  if (
    !name ||
    !email ||
    !phone ||
    !type ||
    !date ||
    !attendee ||
    !price ||
    !note
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO events (name,email,phone,type,date,attendee,price,note) VALUES (?,?,?,?,?,?,?,?)`;
  db.query(sql,[name,email,phone,type,date,attendee,price,note],(err,result) => {
    if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error Adding Event" });
      }
      res.json({ message: "Added successful" });
  })
});

//Get Event
event.get("/event",(req,res) => {
    const sql = `SELECT * FROM events`;
    db.query(sql,(err,result) => {
        if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching Events" });
    }
    res.json(result);
    })
})

//Delete Event
event.delete("/event/:id",(req,res) => {
    const eventId = req.params.id;
    const sql = `DELETE FROM events WHERE id = ?`;
    db.query(sql,[eventId],(err,result) => {
        if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Error Deleting Event from DB" });
      }
      res.json({ message: "Deleted successfully" });
    })
})

module.exports = event;