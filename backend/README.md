# CoreSlash Technologies - Backend Foundation (Phase 1)

Production-ready backend foundation for CoreSlash Technologies Website CMS built with NestJS, Prisma, PostgreSQL, and Swagger.

## Project Structure

```
backend/
├── src/
│   ├── core/           # Shared core application resources (config, constants, helpers, interfaces, types)
│   ├── common/         # Common HTTP infrastructure (decorators, DTOs, filters, guards, interceptors, middleware, pipes)
│   ├── config/         # NestJS configuration modules
│   ├── database/       # PrismaService singleton and database initialization
│   ├── health/         # Health check endpoint (/api/v1/health)
│   ├── modules/        # Pre-created module directories for future CMS modules
│   ├── app.module.ts   # Root module importing all foundation features
│   └── main.ts         # Application entry point with global pipes, security, and Swagger setup
├── prisma/             # Schema definition for PostgreSQL database
├── storage/            # Local disk storage for static upload files (/uploads/...)
├── .env.example        # Environment variable template
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL Database Server

### Setup Instructions

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure PostgreSQL is running and update `DATABASE_URL` in `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/coreslash_db?schema=public"
   ```

4. Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

5. Start Development Server:
   ```bash
   npm run start:dev
   ```

### API Documentation & Health Check

- **Health Endpoint**: GET `http://localhost:5000/api/v1/health`
- **Swagger Documentation**: `http://localhost:5000/api/docs`
- **Static File Storage**: Served at `http://localhost:5000/uploads/`
