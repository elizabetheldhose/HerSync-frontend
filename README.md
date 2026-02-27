# 💜 HerSync – AI-Powered Personal Life Tracker (Frontend)

Live Demo: https://her-sync-frontend.vercel.app  
Backend API: https://hersync-backend.onrender.com  

---

## 🚀 Overview

HerSync is a production-ready full-stack life management platform built using the MERN stack.  
This repository contains the **React frontend application**, deployed on Vercel.

The platform integrates:

- 📋 Task Management with calendar view
- 💰 Personal Finance Tracking
- 🌸 AI-powered Women’s Health Insights
- 🔐 Secure JWT Authentication
- ☁️ Cloud-based deployment architecture

---

## 🛠 Tech Stack

- React (Vite)
- React Router
- Context API / Redux (Global State)
- Tailwind CSS
- Axios
- DayPicker (Calendar)
- Deployed on Vercel

---

## ✨ Key Features

### 🔐 Authentication
- JWT-based login & registration
- Protected routes
- Persistent session handling

### 📋 Task Management
- Create / Edit / Delete tasks
- Toggle completion status
- Calendar view integration
- Date filtering (Today / Last 7 Days / Month)
- Real-time UI updates

### 💰 Finance Tracking
- Transaction tracking
- Monthly analytics
- Summary insights

### 🌸 Health Tracking
- Women’s cycle tracking
- AI-powered health insights
- Intelligent data visualization

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
VITE_API_URL=https://hersync-backend.onrender.com


Installation

npm install
npm run dev

Deployment

This frontend is deployed using Vercel.

SPA routing fix included via:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}



