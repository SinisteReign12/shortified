<div align="center">

# 🚀 Shortified

A modern URL shortening platform built with **Next.js**, **MongoDB Atlas**, and **NextAuth** that enables users to create, manage, and track short links with real-time analytics.

**🌐 Live Demo:** https://shortified.vercel.app

</div>

---

## 📖 Overview

Shortified is a full-stack URL shortening application designed to provide a fast, secure, and user-friendly experience. Users can create custom short links, manage them through a personalized dashboard, generate QR codes, and monitor link performance with built-in analytics.

---

## ✨ Features

- 🔗 Instant URL shortening
- ✏️ Custom aliases
- 📊 Analytics dashboard
- 📱 QR code generation
- 🔍 Duplicate URL detection
- ⏳ Link expiration
- 🔐 Secure authentication
  - Email & Password
  - Google Sign-In
- 📝 Edit existing aliases
- 🗑️ Delete links
- 📈 Click tracking
- 📱 Fully responsive design

---

## 🖼️ Preview

### Home

<img width="1847" height="1024" alt="image" src="https://github.com/user-attachments/assets/ef2ecefe-4935-4ec1-b5f0-c7f8d2a3ef7c" />


### Login

<img width="1854" height="1024" alt="image" src="https://github.com/user-attachments/assets/7889cec6-ec3c-4328-b96d-8d7e9c3cf2f8" />


---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS

### Backend

- Next.js Route Handlers
- NextAuth.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- Credentials Provider
- Google OAuth

### Libraries

- Recharts
- React Hot Toast
- React QR Code
- NanoID
- Bcrypt.js

### Deployment

- Vercel

---

## ⚙️ Environment Variables

This project requires the following environment variables:

- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

---

## 📂 Project Structure

```
src
├── app
│   ├── api
│   ├── dashboard
│   ├── login
│   ├── signup
│   └── page.js
│
├── components
├── lib
├── models
└── middleware.js
```

---

## 🚀 Key Highlights

- Authentication using NextAuth
- Google OAuth integration
- MongoDB Atlas cloud database
- Responsive UI with Tailwind CSS
- Secure password hashing using Bcrypt
- Automatic QR code generation
- Real-time analytics dashboard
- Deployed on Vercel

---

## 🔮 Future Improvements

- Password reset
- Device & browser analytics
- Geographic click tracking
- CSV export
- Folder organization
- Bulk URL shortening
- Dark/Light theme
- Public analytics pages
- REST API for developers

---

## 👨‍💻 Author

**Devansh Arya**

GitHub: https://github.com/SinisteReign12

---

## ⭐ If you found this project interesting, consider giving it a star!
