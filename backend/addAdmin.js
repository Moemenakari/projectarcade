const bcrypt = require("bcryptjs");
const db = require("./db");

async function addAdmin() {
  const username = "Admin";
  const password = "admin123";
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 8);
  
  // Insert admin into database
  const query = "INSERT INTO users (username, password, is_admin) VALUES (?, ?, 1)";
  
  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) {
      console.error("Error creating admin:", err);
      process.exit(1);
    }
    console.log("✅ Admin user created successfully!");
    console.log("Username:", username);
    console.log("Password:", password);
    process.exit(0);
  });
}

addAdmin();
