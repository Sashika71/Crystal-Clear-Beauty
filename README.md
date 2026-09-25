#  Crystal Clear Beauty — Frontend 💅💄

The customer-facing web app and admin dashboard for **Crystal Clear Beauty**, a cosmetics e-commerce platform. Built with **React 19**, **Vite**, and **Tailwind CSS v4**.

> 🔗 Backend repo: https://github.com/Sashika71/crystal-beauty-clear-backend.git

---

## ✨ Features

**Storefront**
- 🏠 Home page with an image slider / hero banner
- 🛒 Product listing & product overview pages
- 🛍️ Cart (persisted in `localStorage`) and checkout flow
- ⭐ Customer reviews page
- 📩 Contact Us page
- 🔐 Email/password login & registration + **Google Sign-In**

**Admin Dashboard** (`/admin/*`)
- 📊 Sidebar navigation: Users / Products / Orders
- ➕ Add, ✏️ edit, and 🗑️ delete products
- 📦 View and update order statuses
- 🖼️ Direct-to-Supabase image uploads for product photos

---

## 🧱 Tech Stack

| Category         | Technology                          |
|-------------------|---------------------------------------|
| Framework         | React 19 + Vite 7                      |
| Routing           | React Router v7                        |
| Styling           | Tailwind CSS v4                        |
| HTTP client       | Axios                                  |
| Auth              | JWT (from backend) + `@react-oauth/google` |
| Notifications     | `react-hot-toast` / `react-toastify`   |
| Image storage     | Supabase Storage (client-side upload)  |
| Containerized     | Docker                                  |

---

## 🏗️ How It Fits Into the System

```
                         ┌──────────────────────────────┐
                         │        Client Browser         │
                         └───────────────┬────────────────┘
                                          │ HTTPS
                                          ▼
                         ┌──────────────────────────────┐
                         │   THIS REPO — React + Vite    │
                         │  Home · Products · Cart ·      │
                         │  Checkout · Reviews · Admin    │
                         └───────┬────────────────┬───────┘
                                 │                │
                    REST/JSON    │                │  Direct upload
                    (Axios,      │                │  (Supabase JS SDK)
                    Bearer JWT)  │                │
                                 ▼                ▼
              ┌───────────────────────────┐  ┌─────────────────────────┐
              │  crystal-clear-beauty-      │  │   Supabase Storage       │
              │  backend (Express + Mongo)  │  │   (product images)       │
              └───────────────────────────┘  └─────────────────────────┘
```

- All product/order/user/review data flows through `VITE_BACKEND_URL` to the backend REST API.
- Product images are uploaded **directly from the browser** to Supabase Storage (`Utils/mediaUplaod.jsx`) — the backend never touches image files, it just stores the resulting public URL.
- The JWT returned on login is attached as `Authorization: Bearer <token>` on protected requests (admin actions, placing orders, etc).

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in your own values — **never commit `.env`**:

```
VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# then edit .env with your backend URL and Google client ID
```

### 3. Run in development
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
npm run preview   # preview the production build locally
```

### 🐳 Run with Docker
This service is also wired up in the root [`docker-compose.yml`](../docker-compose.yml) alongside the backend and MongoDB:
```bash
docker compose up --build
```

---
