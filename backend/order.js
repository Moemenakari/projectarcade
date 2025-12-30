const express = require("express");
const db = require("./db");

const order = express.Router();

//Add Orders
order.post("/addRentalOrder", (req, res) => {
  const { name, email, phone, machine_type, start_date, end_date, location } =
    req.body;
  if (
    !name ||
    !email ||
    !phone ||
    !machine_type ||
    !start_date ||
    !end_date ||
    !location
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `INSERT INTO rental_orders (name,email,phone,machine_type,start_date,end_date,location) VALUES (?,?,?,?,?,?,?)`;
  db.query(
    sql,
    [name, email, phone, machine_type, start_date, end_date, location],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error Adding RentalOrder" });
      }
      res.json({ message: "Added successful" });
    }
  );
});

//Get Orders
order.get("/rentalOrder", (req, res) => {
  const sql = `SELECT * FROM rental_orders`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching orders" });
    }
    res.json(result);
  });
});

//Updated Status
order.put("/updateStatus", (req, res) => {
  const { id, status } = req.body;

  const sql = `UPDATE rental_orders SET status = ? WHERE id = ?`;
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error updating status" });
    }
    return res.json({ message: "Status updated successfully" });
  });
});

//Delete Order
order.delete("/rentalOrder/:id", (req, res) => {
  const orderId = req.params.id;
  const sql = `DELETE FROM rental_orders WHERE id = ?`;
  db.query(sql, [orderId], (err,result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error Deleting order from DB" });
    }
    res.json({ message: "Deleted successfully" });
  });
});

//Count of Orders
order.get("/stats/rentalOrder", (req,res) => {
  const sql = `SELECT COUNT(*) AS total_rental_orders FROM rental_orders`;
  db.query(sql,(err,orderData) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error counting orders" });
    }

    res.json({rentalOrderCount:orderData[0].total_rental_orders});
  })
})

module.exports = order;
