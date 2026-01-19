# 🚀 EQB API

Express.js backend for the EQB Platform

## Features

- REST API with Express.js
- PostgreSQL database with Prisma ORM
- Redis for caching and job queues
- TypeScript for type safety
- Zod for request validation
- SendGrid for email notifications
- Bull for background jobs
- Winston for logging
- JWT authentication

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL 15
- Redis 7

### Installation

```bash
cd apps/api
pnpm install
```

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/eqb_dev
REDIS_URL=redis://localhost:6379
API_PORT=3001
NODE_ENV=development
```

### Database Setup

```bash
pnpm run db:migrate
pnpm run db:seed
pnpm run db:studio  # Prisma Studio
```

### Development

```bash
pnpm run dev
```

Server will run on http://localhost:3001

## API Routes

### Health Check
- `GET /health` - Server health status

### Authentication (to be implemented)
- `POST /api/auth/login`
- `POST /api/auth/signup`
- `POST /api/auth/refresh`

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Clients
- `GET /api/clients` - List clients
- `POST /api/clients` - Create client
- `PUT /api/clients/:id` - Update client

### Invoices
- `GET /api/invoices` - List invoices
- `POST /api/invoices/generate` - Generate invoice
- `POST /api/invoices/:id/send` - Send invoice

## Testing

```bash
pnpm run test
pnpm run test:coverage
```

## Production Build

```bash
pnpm run build
pnpm run start
```

## Database Schema

See [prisma/schema.prisma](./prisma/schema.prisma) for the complete schema.

## Logging

Uses Pino for structured logging:

```typescript
import pino from 'pino';
const logger = pino();
logger.info({ message: 'Hello' });
```

## Error Handling

All errors are caught by the global error handler and returned as JSON responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input"
  },
  "statusCode": 400,
  "timestamp": "2024-01-18T10:00:00Z"
}
```
