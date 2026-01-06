const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./Auth");
app.use("/api", authRoutes);

const productRoutes = require("./product");
app.use("/api", productRoutes);

const orderRoutes = require("./order");
app.use("/api", orderRoutes);

const eventRoutes = require("./event");
app.use("/api",eventRoutes);

const migrateRoutes = require("./migrate");
app.use("/api", migrateRoutes);

const contactRoutes = require("./contact");
app.use("/api", contactRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Project Arcade API',
        status: 'Online',
        version: '1.0.0',
        endpoints: {
            auth: ['/api/register', '/api/login', '/api/users'],
            products: ['/api/product', '/api/addProduct', '/api/update/:id', '/api/stats/product'],
            orders: ['/api/rentalOrder', '/api/addRentalOrder', '/api/updateStatus', '/api/stats/rentalOrder'],
            events: ['/api/event', '/api/addEvent'],
            contacts: ['/api/contact', '/api/addContact']
        },
        documentation: 'https://github.com/Moemenakari/projectarcade'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});