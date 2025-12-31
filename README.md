# Project Arcade - Arcade Machine Rental & Event Management System

A comprehensive web application for managing arcade machine rentals, sales, and event bookings. Built with Node.js backend and React frontend, deployed on Railway with MySQL database.

## 📋 Project Overview

**Project Name:** Project Arcade  
**Course:** CSCI426 - Advanced Web Programming  
**Phase:** 2 (Backend Development & Deployment)  
**Deployment Status:** ✅ Successfully Deployed  
**Live URL:** https://projectarcade-production.up.railway.app

This project provides a complete solution for arcade businesses to manage their inventory, handle customer orders, and organize gaming events through a modern web interface.

---

## 🚀 Features

### Core Functionality
- **User Authentication:** Secure login and registration system with JWT tokens
- **Product Management:** Full CRUD operations for arcade machine inventory
- **Rental Orders:** Create, track, and manage machine rental orders
- **Event Management:** Schedule and manage gaming events
- **Admin Panel:** Administrative controls for user and inventory management
- **Statistics & Analytics:** Revenue calculation and order statistics

### Technical Features
- RESTful API architecture
- MySQL database with relational schema
- JWT-based authentication with 24-hour token expiration
- Image upload support for product listings
- CORS-enabled for frontend integration
- Environment-based configuration
- Automatic deployment via GitHub integration

---

## 🛠️ Technologies Used

### Backend
- **Runtime:** Node.js 22.21.1
- **Framework:** Express.js 5.2.1
- **Database:** MySQL 9.4
- **Authentication:** JSON Web Tokens (jsonwebtoken 9.0.3)
- **Password Hashing:** bcrypt 6.0.0
- **File Upload:** Multer 2.0.2
- **Environment Management:** dotenv 17.2.3
- **Database Driver:** mysql2 3.16.0

### Deployment & Infrastructure
- **Platform:** Railway
- **Region:** us-west2
- **Database Hosting:** Railway MySQL with volume backup
- **CI/CD:** Automatic deployment from GitHub
- **Builder:** Railpack (Railway's default)

### Development Tools
- **Version Control:** Git & GitHub
- **Package Manager:** npm
- **Development Server:** nodemon 3.1.11

---

## 📁 Project Structure

```
projectarcade/
├── backend/
│   ├── server.js           # Main server entry point
│   ├── db.js              # Database configuration
│   ├── Auth.js            # Authentication routes
│   ├── product.js         # Product management routes
│   ├── order.js           # Order management routes
│   ├── event.js           # Event management routes
│   ├── uploads/           # Uploaded product images
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   └── [React application files]
└── README.md
```

---

## 🗄️ Database Schema

### Tables

#### 1. users
User authentication and admin management
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- username (VARCHAR)
- password (VARCHAR, hashed)
- is_admin (BOOLEAN)
```

#### 2. products
Arcade machine inventory
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- category (VARCHAR)
- sale_price (DECIMAL)
- rentel_price (DECIMAL)
- stock (INT)
- description (TEXT)
- power (VARCHAR)
- image (VARCHAR)
```

#### 3. rental_orders
Machine rental orders
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- machine_type (VARCHAR)
- start_date (DATE)
- end_date (DATE)
- location (VARCHAR)
- status (VARCHAR)
```

#### 4. events
Event management
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- type (VARCHAR)
- date (DATE)
- attendee (INT)
- price (DECIMAL)
- note (TEXT)
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login (returns JWT token)

### Products
- `GET /api/product` - Get all products
- `POST /api/addProduct` - Add new product (Admin only)
- `PUT /api/update/:id` - Update product (Admin only)
- `DELETE /api/product/:id` - Delete product (Admin only)
- `GET /api/stats/product` - Get product statistics
- `GET /api/stats/CalculateRevenue` - Calculate revenue

### Orders
- `GET /api/rentalOrder` - Get all rental orders
- `POST /api/addRentalOrder` - Create new rental order
- `PUT /api/updateStatus` - Update order status
- `DELETE /api/rentalOrder/:id` - Delete rental order
- `GET /api/stats/rentalOrder` - Get order statistics

### Events
- `GET /api/event` - Get all events
- `POST /api/addEvent` - Create new event
- `DELETE /api/event/:id` - Delete event

### Users
- `GET /api/users` - Get all users (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MySQL database
- Git installed

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/Moemenakari/projectarcade.git
cd projectarcade
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Configure environment variables**
Create a `.env` file in the backend directory:
```env
MYSQL_URL=mysql://username:password@host:port/database
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

4. **Set up the database**
- Create a MySQL database
- Run the schema creation scripts (tables will be created automatically on first run)

5. **Start the development server**
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Frontend Setup (Optional)

1. **Navigate to frontend directory**
```bash
cd frontend
npm install
```

2. **Start the frontend development server**
```bash
npm start
```

---

## 🚢 Deployment on Railway

### Current Deployment Configuration

**Project Name:** pleasant-alignment  
**Environment:** production  
**Backend URL:** https://projectarcade-production.up.railway.app  
**Database:** Railway MySQL with automatic backups

### Deployment Steps

1. **Connect GitHub Repository**
   - Link your GitHub account to Railway
   - Select the `Moemenakari/projectarcade` repository

2. **Configure Backend Service**
   - Root Directory: `/backend`
   - Build Command: Automatic (npm install)
   - Start Command: `node server.js`

3. **Add MySQL Database**
   - Add MySQL service from Railway marketplace
   - Railway automatically creates `MYSQL_URL` environment variable

4. **Set Environment Variables**
   - `MYSQL_URL`: Automatically configured by Railway
   - `JWT_SECRET`: Set your secret key
   - `PORT`: Railway assigns automatically

5. **Deploy**
   - Push to main branch triggers automatic deployment
   - Railway builds and deploys the application

### Continuous Deployment

The project is configured for automatic deployment:
- **Trigger:** Commits to `main` branch
- **Build:** Automatic via Railpack
- **Deploy:** Automatic on successful build

To deploy changes:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

---

## 🧪 Testing the API

### Test Backend Connectivity
```bash
curl https://projectarcade-production.up.railway.app/api/product
```

### Register a New User
```bash
curl -X POST https://projectarcade-production.up.railway.app/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'
```

### Login
```bash
curl -X POST https://projectarcade-production.up.railway.app/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Admin","password":"your-password"}'
```

### Add a Product (requires JWT token)
```bash
curl -X POST https://projectarcade-production.up.railway.app/api/addProduct \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name":"Pac-Man Arcade",
    "category":"Classic",
    "sale_price":2999.99,
    "rentel_price":199.99,
    "stock":5,
    "description":"Classic Pac-Man arcade machine",
    "power":"110V"
  }'
```

---

## 🔒 Security Features

- **Password Hashing:** All passwords encrypted using bcrypt
- **JWT Authentication:** Secure token-based authentication
- **Environment Variables:** Sensitive data stored securely
- **CORS Configuration:** Controlled cross-origin access
- **SQL Injection Prevention:** Parameterized queries via mysql2
- **Private Network:** Database accessible via Railway internal network

---

## 📊 Database Connection Details

### Production (Railway)
- **Host:** mysql.railway.internal (private network)
- **Public TCP Proxy:** turntable.proxy.rlwy.net:20542
- **Database Name:** railway
- **Connection:** Automatic via MYSQL_URL environment variable

---

## 🎯 Project Requirements Checklist

### Backend ✅
- [x] Node.js implementation
- [x] CRUD operations on MySQL database
- [x] User authentication (Login/Signup)
- [x] JWT token-based security

### Database ✅
- [x] Two related entities (Users, Products, Orders, Events)
- [x] Proper data validation
- [x] Error handling implemented

### Version Control ✅
- [x] Git repository with commit history
- [x] Hosted on GitHub
- [x] README.md with documentation

### Deployment ✅
- [x] Backend deployed on Railway
- [x] Database hosted on Railway
- [x] Public URL accessible
- [x] Environment variables configured

### Optional Features 🎁
- [x] Admin panel functionality
- [ ] Email notifications (can be added)
- [ ] Mobile text messages (can be added)

---

## 📸 Screenshots

### Railway Dashboard
![Railway Dashboard](screenshots/railway-dashboard.png)

### API Testing
![API Response](screenshots/api-testing.png)

### Database Schema
![Database Tables](screenshots/database-schema.png)

---

## 🐛 Troubleshooting

### Common Issues

**Backend not connecting to database:**
- Verify `MYSQL_URL` environment variable is set correctly
- Check MySQL service is online in Railway dashboard
- Review backend logs for connection errors

**Port conflicts:**
- Railway automatically assigns ports
- Ensure `process.env.PORT` is used in server.js

**Deployment failures:**
- Check GitHub Actions status
- Review build logs in Railway dashboard
- Ensure all dependencies are in package.json

---

## 🔮 Future Enhancements

- Frontend deployment on Railway
- Email notification system for orders
- SMS alerts for event reminders
- Payment gateway integration
- Real-time inventory tracking
- Customer review system
- Advanced analytics dashboard
- Multi-language support

---

## 👥 Contributors

- **Developer:** Moemen Akari
- **Course:** CSCI426 - Advanced Web Programming
- **Institution:** Department of Computer Science and Information Technology

---

## 📄 License

This project is developed as part of an academic course requirement.

---

## 📞 Support

For questions or issues:
- **GitHub Repository:** https://github.com/Moemenakari/projectarcade
- **Railway Dashboard:** https://railway.com/project/f24cfc81-22c9-4ccd-bd1c-b1e42940da40

---

## 🎉 Deployment Status

**Status:** ✅ Successfully Deployed  
**Last Updated:** December 31, 2025  
**Backend:** Online and operational  
**Database:** Connected and functional  
**API:** All endpoints responding correctly

---

**Built with ❤️ for CSCI426 Advanced Web Programming**
