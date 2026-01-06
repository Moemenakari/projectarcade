const db = require('./db');

const createTableSQL = `
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

db.query(createTableSQL, (err, result) => {
    if (err) {
        console.error('Error creating contacts table:', err);
        process.exit(1);
    }
    console.log('✅ Contacts table created successfully');
    process.exit(0);
});
