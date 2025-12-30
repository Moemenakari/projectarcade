const mysql = require('mysql');

const db = mysql.createConnection(process.env.MYSQL_URL || {
    host: "localhost",
    user: "root",
    password: "",
    database: "arcade" 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;
