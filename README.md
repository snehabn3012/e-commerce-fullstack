# 🛍️ Full Stack E-Commerce Platform (MERN)

A production-ready, scalable e-commerce application built using the MERN stack.  
Designed with a modular architecture, secure authentication, and optimized frontend performance.

🔗 **Live Demo:** ''  
🔗 **API Base URL:** ''  

---

## 📌 Project Overview

This project simulates a real-world e-commerce system with authentication, product management, cart flow, and order handling.  

The focus was on:

- Clean frontend architecture
- Reusable UI components
- Secure backend APIs
- Proper environment configuration
- Production-ready deployment

---

## 🧠 Architecture
Client (React) → Express API → MongoDB Atlas
│ │
Vercel Render


- Frontend and backend are deployed independently.
- Environment variables are isolated per service.
- RESTful API structure with JWT-based authentication.

---

## 🏗️ Tech Stack

### Frontend
- React (Vite / CRA)
- React Router
- Axios
- Tailwind CSS
- Context API / State Management

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt (password hashing)

### Dev & Deployment
- GitHub (Version Control)
- Render (Backend Hosting)
- Vercel (Frontend Hosting)
- MongoDB Atlas (Cloud Database)

---

## 🔐 Core Features

### 👤 Authentication
- Secure user registration & login
- JWT-based session handling
- Protected routes (frontend + backend)
- Password hashing using bcrypt

### 🛒 Shopping Flow
- Product listing with dynamic data
- Product details page
- Add to cart functionality
- Quantity updates
- Order placement

### 🛠️ Admin Capabilities (Optional if implemented)
- Add / Update / Delete products
- Order management

---

## ⚡ Performance & Engineering Highlights

- Modular folder structure (separated client & server)
- Centralized API configuration using environment variables
- Proper CORS configuration
- Error handling middleware
- Scalable backend routing structure
- Reusable React components
- Clean separation of concerns

---

## 🧩 Challenges Solved

- Managing CORS between separate domains
- Handling JWT authentication across frontend & backend
- Structuring scalable Express middleware
- Secure deployment configuration
- Avoiding environment variable leakage

---

## 🎯 What This Project Demonstrates

- Strong frontend architecture
- Full-stack integration capability
- REST API design knowledge
- Authentication & security best practices
- Production deployment understanding
- Clean and maintainable code structure
