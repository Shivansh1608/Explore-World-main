# ExploreWorld 🌍

> **Discover Places. Plan Journeys. Explore Together.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-explore--world--main.vercel.app-00875a?style=for-the-badge&logo=vercel)](https://explore-world-main.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.3-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas%20Cloud-47a248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/cloud/atlas)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-4285f4?style=for-the-badge&logo=google)](https://ai.google.dev/)

ExploreWorld is a modern full-stack travel discovery, community, and itinerary-planning web application built with the **MERN Stack** (MongoDB, Express, React, Node.js) and powered by **Google Gemini AI**.

🔗 **Live Deployment**: [https://explore-world-main.vercel.app/](https://explore-world-main.vercel.app/)

---

## ✨ Features

### 🌟 1. Rich Landing & Discovery
- **Hero Showcase**: Live search with smart keyword routing across 18 world-famous destinations.
- **Trust Stats**: Active travelers count, curated destinations, verified reviews, and average community ratings.
- **Curated Catalog**: 18 handpicked destinations including **Manali, Bali, Paris, Kyoto, Swiss Alps, Maldives, Santorini, Dubai, Rome, Banff, Serengeti, Ladakh, Rio, Queenstown, Tokyo, Cairo, and Machu Picchu**.
- **Interactive Categories**: Filter by *Mountains, Beaches, Heritage, Adventure, Wildlife, and Culture*.
- **Spotlight Showcase**: Deep-dive features on top seasonal destinations with budget breakdowns.

### 🤖 2. Google Gemini AI Travel Companion
- **Real-Time Gemini Integration**: Powered by `gemini-3.5-flash` with dynamic fallback to ensure zero downtime.
- **Conversational Memory**: Retains multi-turn chat history for detailed travel planning.
- **Smart Recommendations**: Custom day-by-day itineraries, budget estimates in local currencies, season timings, and packing lists.
- **Interactive Destination Pills**: AI responses automatically link mentioned destinations to their ExploreWorld detail pages.
- **Offline Fallback Engine**: If disconnected, an intelligent client-side planner handles requests seamlessly.

### 🗺️ 3. Interactive World Map
- **Visual Radar Beacon Pins**: Displays global destinations on an interactive coordinates grid.
- **Dynamic Category Filtering**: Instantly isolate mountain retreats, tropical beaches, or heritage wonders.
- **Map / List View Toggle**: Seamlessly switch between the visual map and a scannable grid.

### 🎒 4. Multi-Trip Itinerary Planner
- **Custom Trip Creation**: Organize multiple trips with custom durations, destinations, and budgets.
- **Interactive Checklists**: Check off activity stops as you explore.
- **Activity Estimator**: Track estimated spending per stop with budget overviews.

### 👥 5. Community Feed & Travel Stories
- **Story Creator**: Post travel experiences with captions and photo URLs.
- **Interactive Engagement**: Like, comment, and bookmark fellow travelers' adventures.
- **Trending Destinations Sidebar**: Instant access to what's buzzing in the community.

### 🔐 6. User Authentication & Wishlists
- **Full Auth Flow**: Register, Login, JWT session management with password hashing (`bcryptjs`).
- **Personalized Wishlist**: Bookmark destinations with instant counter badges in the navbar.
- **Custom User Profiles**: Editable bio, travel preferences, and saved itineraries.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Cloud Cluster) + Mongoose
- **AI Engine**: Google Generative AI SDK (`@google/generative-ai`)
- **Security**: Helmet, CORS, Cookie-Parser, Express-Rate-Limit
- **Validation**: Zod
- **Authentication**: JWT + bcryptjs
- **Deployment**: Render

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/Shivansh1608/Explore-World-main.git
cd Explore-World-main
```

### 2. Configure Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
```

Seed the database with all 18 destinations and demo content:
```bash
node src/config/seed.js
```

Start the backend:
```bash
npm run dev
```

### 3. Configure Frontend
In a new terminal:
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser!

---

## 🌐 Deployment Details

| Component | Platform | URL / Status |
|---|---|---|
| **Frontend** | [Vercel](https://vercel.com) | [https://explore-world-main.vercel.app/](https://explore-world-main.vercel.app/) |
| **Backend** | [Render](https://render.com) | Express API on Render Web Service |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | M0 Cloud Cluster (18 Curated Destinations) |
| **AI Companion** | [Google Gemini](https://ai.google.dev/) | `gemini-3.5-flash` via Generative AI SDK |

---

## 📂 Project Structure

```text
Explore-World-main/
├── client/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer, Reusable UI
│   │   ├── context/            # AuthContext, BookmarkContext
│   │   ├── data/               # 18 Fallback Destinations
│   │   ├── pages/
│   │   │   ├── Home/           # Landing page, Community, Maps, AI Assistant
│   │   │   ├── Destination/    # Destination Detail & Creation
│   │   │   ├── Trips/          # Interactive Trip Planner
│   │   │   ├── Saved/          # Saved Places / Wishlist
│   │   │   ├── Profile/        # User Profile & Stats
│   │   │   └── Auth/           # Login & Register
│   │   ├── services/           # Axios API configuration
│   │   ├── App.jsx             # Routes & Global Providers
│   │   └── main.jsx
│   ├── vercel.json             # Vercel SPA routing rewrites
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/             # Database connection & Seeder script
│   │   ├── modules/
│   │   │   ├── ai/             # Gemini AI routes & travel engine
│   │   │   ├── auth/           # Login, Register, JWT verification
│   │   │   ├── destinations/   # Destination schemas & services
│   │   │   ├── trips/          # Trip itinerary management
│   │   │   ├── posts/          # Community stories & likes
│   │   │   ├── reviews/        # Destination ratings & feedback
│   │   │   └── users/          # User profiles & models
│   │   ├── app.js              # Express app, CORS & middlewares
│   │   └── server.js           # Server entry point
│   └── package.json
└── README.md
```

---

## 👨‍💻 Author

**Shivansh** — [GitHub Profile](https://github.com/Shivansh1608)

---

## 📄 License

This project is licensed under the MIT License - feel free to use and adapt it for your own travel projects!
