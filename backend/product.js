const express = require("express");
const db = require("./db");
const multer = require("multer");

const product = express.Router();

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Max 5MB
});

//Add Product
product.post("/addProduct", upload.single("image"), (req, res) => {
  const { name, category, sale_price, rental_price, stock, description, power } = req.body;
  
  if (
    !name ||
    !category ||
    !sale_price ||
    !rental_price ||
    stock === undefined ||
    !description ||
    !power ||
    !req.file
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Convert image to Base64
  const imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  
  const sql = `INSERT INTO products (name,category,sale_price,rentel_price,stock,description,power,image) VALUES (?,?,?,?,?,?,?,?)`;
  db.query(
    sql,
    [name, category, sale_price, rental_price, stock, description, power, imageBase64],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error Adding Product" });
      }
      res.json({ message: "Added successful" });
    }
  );
});

//Get Product
product.get("/product", (req, res) => {
  const sql = `SELECT * FROM products`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching products" });
    }
    res.json(result);
  });
});

//Delete Product
product.delete("/product/:id", (req, res) => {
  const productId = req.params.id;
  const deleteSql = "DELETE FROM products WHERE id = ?";
  db.query(deleteSql, [productId], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error Deleting product from DB" });
    }
    res.json({ message: "Deleted successfully" });
  });
});

//Update Product
product.put("/update/:id", upload.single("image"), (req, res) => {
  const productId = req.params.id;
  const { name, category, sale_price, rental_price, stock, description, power } = req.body;
  
  const sqlGet = "SELECT image FROM products WHERE id = ?";
  db.query(sqlGet, [productId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error finding product" });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageBase64 = data[0].image; // Keep old image
    
    // If new image uploaded
    if (req.file) {
      imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }

    const sqlUpdate = `UPDATE products SET name=?, category=?, sale_price=?, rentel_price=?, stock=?, description=?, power=?, image=? WHERE id=?`;

    db.query(
      sqlUpdate,
      [
        name,
        category,
        sale_price,
        rental_price,
        stock,
        description,
        power,
        imageBase64,
        productId,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error Updating Product" });
        }
        res.json({ message: "Updated successfully" });
      }
    );
  });
});

//Count Of Product
product.get("/stats/product", (req,res) => {
  const sql = `SELECT COUNT(*) AS total_products FROM products`;
  db.query(sql,(err,productData) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error counting products" });
    }

    res.json({productsCount:productData[0].total_products});
  })
})

//Calculate Revenue
product.get("/stats/CalculateRevenue", (req,res) => {
  const sql = `SELECT SUM(sale_price * stock) AS total_revenue FROM products`;
  db.query(sql,(err,RevenueData) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error ccalculating revenue" });
    }

    res.json({Revenue:RevenueData[0].total_revenue || 0});
  })
})


module.exports = product;
