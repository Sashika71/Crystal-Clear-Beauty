
# Crystal Clear Beauty 💄

Crystal Clear Beauty is an AI-powered cosmetics e-commerce platform that provides a seamless online shopping experience. It combines a modern web application, secure user authentication, product and order management, and an AI-powered cosmetics assistant using Retrieval-Augmented Generation (RAG).

## ✨ Key Features

- Browse and explore cosmetic products.
- Secure user authentication with JWT and Google Sign-In.
- Shopping cart and order management.
- Admin dashboard for managing products, users, and orders.
- Customer reviews and ratings.
- AI-powered cosmetics chatbot for product-related assistance.
- Product information retrieval using RAG.

## 🧱 Tech Stack

| Component | Technologies |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Authentication | JWT, Google OAuth 2.0 |
| AI / RAG Service | Python, FastAPI, LangChain, ChromaDB |
| Embeddings | Sentence Transformers |
| LLM | Hugging Face Inference API |
| Storage | Supabase Storage |
| Containerization | Docker, Docker Compose |

## 🏗️ Repository Structure

```text
Crystal-Clear-Beauty/
│
├── frontend/       # React-based e-commerce application
├── backend/        # Express REST API and MongoDB integration
├── rag-service/    # AI-powered RAG chatbot service
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🔄 System Architecture

```text
Customer
   │
   ▼
React + Vite Frontend
   │
   ▼
Node.js + Express Backend ───────► MongoDB
   │
   ▼
Python FastAPI RAG Service
   │
   ▼
ChromaDB + Hugging Face LLM
```

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/Sashika71/Crystal-Clear-Beauty.git
cd Crystal-Clear-Beauty
```

Each service contains its own dependencies and environment configuration. Refer to the respective project folders for setup instructions.

To run the application using Docker Compose:

```bash
docker compose up --build
```

Configure the required environment variables in the respective service folders before running the application. Never commit `.env` files or API secrets.

## 📌 Project Structure

This repository brings together the frontend, backend, and AI-powered RAG chatbot into a single monorepo while preserving their individual Git commit histories.

