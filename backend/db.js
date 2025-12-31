const mysql = require('mysql2');

// Parse MYSQL_URL if available, otherwise use individual environment variables
let dbConfig;

if (process.env.MYSQL_URL) {
    // Parse connection string: mysql://user:password@host:port/database
    const url = new URL(process.env.MYSQL_URL);
    dbConfig = {
        host: url.hostname,
        port: url.port || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.slice(1) // Remove leading slash
    };
} else {
    // Use individual environment variables (Railway provides these)
    dbConfig = {
        host: process.env.MYSQL_HOST || "localhost",
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "arcade"
    };
}

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        console.error('Database config:', {
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            database: dbConfig.database
        });
        return;
    }
    console.log('Connected to the MySQL database.');
    console.log('Database host:', dbConfig.host);
});

module.exports = db;
