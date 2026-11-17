# Explore World 🌍

> **Discover Places. Share Experiences. Explore Together.**

Explore World is a full-stack, production-oriented travel discovery and social networking platform built with the MERN stack (MongoDB, Express.js, React, Node.js) following a Modular Monolith architecture.

---

## 🏗 Architecture & Stack

### Frontend
- **Framework**: React.js 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB (Atlas / Local) + Mongoose
- **Security**: Helmet, CORS, Cookie-Parser, Express-Rate-Limit
- **Validation**: Zod
- **Authentication**: JWT + bcryptjs

---

## 📁 Project Structure

```text
explore-world/
├── client/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI, layout & common components
│   │   ├── pages/              # Page views (Home, Explore, Destination, Auth, Profile...)
│   │   ├── features/           # Feature-specific state and logic
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # Axios API services
│   │   ├── App.jsx             # Root layout & health test component
│   │   ├── main.jsx
│   │   └── index.css           # Tailwind v4 entrypoint
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── server/                     # Node.js + Express REST API
│   ├── src/
│   │   ├── config/             # Database connection & env loaders
│   │   ├── modules/            # Domain-driven feature modules (Auth, Users, Destinations, Trips)
│   │   │   ├── auth/
│   │   │   ├── users/          # User model & controllers
│   │   │   ├── destinations/   # Destination model & controllers
│   │   │   └── trips/          # Trip model & controllers
│   │   ├── middleware/         # Central error handling, auth & 404 middlewares
│   │   ├── utils/              # ApiError, asyncHandler
│   │   ├── app.js              # Express app configuration & middleware
│   │   └── server.js           # Server bootstrap & DB connection
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── docs/                       # Architecture & API specifications
├── legacy-monolith/            # Preserved legacy SSR implementation
├── package.json                # Root package with concurrently dev scripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (LTS recommended)
- **npm**: v9+
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017/explore_world`) or MongoDB Atlas connection string

### 2. Environment Setup

**Backend (`server/.env`):**
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/explore_world
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRES_IN=7d
```

**Frontend (`client/.env`):**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 3. Run Development Servers
From the root directory, start both client and server simultaneously:
```bash
npm run dev
```

Or run them individually:
```bash
# Terminal 1 - Backend API (Port 5000)
npm run server

# Terminal 2 - Frontend Client (Port 5173)
npm run client
```

### 4. Health Check
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend Health Check**: [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health)
