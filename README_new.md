# Project Arcade - Full Stack Web Application

**Author:** Moemen Akari  
**Course:** CSCI426: Advanced Web Programming  
**Project:** Phase 2 - Full Stack Web Application

---

## 🚀 Live Demo & Links

| Component | Link |
|-----------|------|
| **Frontend (Website)** | https://projectarcade.vercel.app |
| **Backend (API)** | https://projectarcade-production.up.railway.app |
| **GitHub Repository** | https://github.com/Moemenakari/projectarcade |

---

## 📋 Project Description

Project Arcade is a full-stack web application designed to solve a real-world problem: providing a one-stop-shop for arcade machine sales, rentals, and event bookings in Lebanon. The application features a user-friendly interface for customers and a powerful admin panel for managing products, orders, users, and events.

---

## ✨ Functional Requirements

### Backend (Node.js):
- ✅ **RESTful API:** Provides endpoints for all application functionalities.
- ✅ **CRUD Operations:** Full support for Create, Read, Update, and Delete operations on all entities.
- ✅ **User Authentication:** Secure Login/Signup functionality using JWT.
- ✅ **File Upload:** Supports image uploads for products.

### Database (MySQL):
- ✅ **Two Related Entities:**
  - **Users:** Stores user information and authentication details.
  - **Products:** Stores arcade machine details, pricing, and stock.
  - **Orders:** Stores rental order information.
  - **Events:** Stores event booking details.
- ✅ **Data Validation:** Proper data validation and error handling on all inputs.

### Frontend (React.js):
- ✅ **User Interface:** A modern, responsive UI for customers.
- ✅ **Admin Panel:** A comprehensive dashboard for administrators to manage the application.

### Additional Features (Bonus):
- ✅ **Admin Panel:** Fully functional admin panel for managing the entire application.

---

## 🚀 Deployment Architecture

### Why Railway for Backend + Database?
1. **Unified Platform:** Railway provides a seamless experience for hosting both Node.js applications and MySQL databases in a single project.
2. **Easy Integration:** Simple to connect the backend service to the database service without complex configurations.
3. **File System Support:** Supports persistent file storage, which is crucial for handling image uploads directly on the server.
4. **Secure Environment Variables:** Provides a secure way to manage sensitive information like database credentials and JWT secrets.
5. **Automated Deployments:** Automatically deploys new versions from the GitHub repository, ensuring the application is always up-to-date.

### Why Vercel for Frontend?
1. **Optimized for React:** Vercel is built by the creators of Next.js and is highly optimized for React applications, providing the best performance.
2. **Global CDN:** Serves the frontend from a global Content Delivery Network (CDN), ensuring fast load times for users worldwide.
3. **Rapid Deployments:** Vercel's build and deployment process is incredibly fast, often taking less than a minute.
4. **Free Tier:** Offers a generous free tier that is perfect for student projects and small applications.
5. **Seamless Git Integration:** Integrates perfectly with GitHub for automated deployments on every push to the `main` branch.

### Why Separate Frontend and Backend?
1. **Modern Best Practice:** Separating the frontend and backend (headless architecture) is the standard for modern web development.
2. **Scalability:** Allows each part of the application to be scaled independently. For example, if the frontend receives a lot of traffic, we can scale it without affecting the backend.
3. **Security:** Creates a clear separation of concerns, which enhances security by isolating the user interface from the business logic and database.
4. **Performance:** Each platform is specialized for its purpose. Vercel is best for serving static files (Frontend), while Railway is excellent for running server-side applications (Backend).
5. **Maintainability:** Makes the codebase easier to manage, as the frontend and backend teams can work independently.

---

## 🔧 Setup and Installation

### Prerequisites:
- Node.js (v18 or higher)
- npm
- Git

### 1. Clone the Repository:
```bash
git clone https://github.com/Moemenakari/projectarcade.git
cd projectarcade
```

### 2. Backend Setup:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following content:
```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

### 3. Frontend Setup:
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` directory with the following content:
```
REACT_APP_API_URL=http://localhost:5000
```

### 4. Running the Application:
- **Start Backend:** In the `backend` directory, run `npm start`
- **Start Frontend:** In the `frontend` directory, run `npm start`

---

## 📸 Screenshots

### Homepage:
![Homepage](https://i.imgur.com/example.png)  *<-- Replace with actual screenshot URL*

### Admin Panel:
![Admin Panel](https://i.imgur.com/example.png)  *<-- Replace with actual screenshot URL*

---

## 🐛 Problems & Solutions

### 1. Images Not Displaying:
- **Problem:** Images were not showing up on the live website.
- **Reason:** The frontend was trying to fetch images from a relative path (`/uploads/...`) instead of the full backend URL.
- **Solution:** Updated the frontend code to prepend the `API_URL` to all image paths, ensuring they are fetched from the Railway backend.

### 2. Admin Panel Delete/Update Failure:
- **Problem:** The Delete and Update functions in the Admin Panel were failing with a "Something went wrong" error.
- **Reason:** The API calls were using relative paths (`/api/...`), which pointed to the Vercel frontend instead of the Railway backend.
- **Solution:** Corrected the API calls to use the full `API_URL`, ensuring that all requests are sent to the correct backend server.

---

## 🚀 Future Scope

- [ ] Implement email notifications for new orders and user registrations.
- [ ] Add a mobile text message verification system.
- [ ] Enhance the Admin Panel with more detailed analytics and reporting.
- [ ] Develop a native mobile application using React Native.

---

**© 2025 Moemen Akari. All Rights Reserved.**
