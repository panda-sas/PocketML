# PocketML

## Overview

PocketML is an interactive flashcard application designed for learning machine learning fundamentals. Users can practice with flashcards that flip to reveal definitions, manage their card library, and study ML concepts through an engaging interface with smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, built using Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for card flip animations and transitions
- **UI Components**: Radix UI primitives wrapped with shadcn/ui styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints defined in shared routes with Zod validation
- **Build Tool**: esbuild for server bundling, Vite for client

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` - defines the cards table with id, term, definition, and category fields
- **Validation**: drizzle-zod for generating Zod schemas from Drizzle tables
- **Database Migrations**: Drizzle Kit with migrations stored in `./migrations`

### Project Structure
```
client/           # React frontend
  src/
    components/   # React components including shadcn/ui
    pages/        # Route pages (Practice, List)
    hooks/        # Custom hooks for data fetching
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Database operations
  db.ts           # Database connection
shared/           # Shared between client and server
  schema.ts       # Drizzle schema definitions
  routes.ts       # API route contracts with Zod
```

### Key Design Patterns
- **Shared Types**: Schema and route definitions shared between frontend and backend for type safety
- **Repository Pattern**: `storage.ts` abstracts database operations through `IStorage` interface
- **API Contracts**: Routes defined with Zod schemas for request/response validation in `shared/routes.ts`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable
- **Connection**: Uses `pg` Pool with Drizzle ORM wrapper

### Third-Party Libraries
- **Radix UI**: Headless UI primitives for accessible components
- **Framer Motion**: Animation library for card interactions
- **Lucide React**: Icon library
- **React Hook Form**: Form handling with Zod resolver for validation

### Development Tools
- **Vite**: Development server with HMR and production bundler
- **Drizzle Kit**: Database schema management and migrations
- **TypeScript**: Type checking across entire codebase

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development banner (dev only)