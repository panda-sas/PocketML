# PocketML 🧠

PocketML is a clean, interactive flashcard application designed to help beginners master machine learning fundamentals. Practice core concepts through an engaging card-flipping interface or manage your collection in the library.

## ✨ Features

- **Interactive Practice**: Study ML concepts with smooth-flipping flashcards.
- **Card Library**: View, search, and manage your entire collection of ML terms.
- **Categorization**: Organize cards by categories (e.g., Basics, Deep Learning, Optimization).
- **CRUD Operations**: Easily add, edit, or delete cards to customize your learning journey.
- **Modern UI**: Clean, responsive design with dark mode support.
- **SEO Optimized**: Fully branded with custom metadata for better visibility.

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, Vite, Wouter (Routing)
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS, shadcn/ui
- **Animations**: Framer Motion
- **State Management**: TanStack Query (React Query)

## 🛠️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   Ensure your `DATABASE_URL` environment variable is set.
   ```bash
   npm run db:push
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5000`.

## 📁 Project Structure

- `client/`: React frontend application
- `server/`: Express backend and storage logic
- `shared/`: Shared TypeScript schemas and route definitions
- `migrations/`: Database migration files
