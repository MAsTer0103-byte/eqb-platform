# 🎨 EQB Web

Next.js frontend for the EQB Platform

## Features

- Next.js 14 with App Router
- React 18 with TypeScript
- TailwindCSS for styling
- React Query for server state
- React Hook Form for form handling
- Zustand for client state management
- Zod for schema validation
- Responsive design

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
cd apps/web
pnpm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

### Development

```bash
pnpm run dev
```

App will run on http://localhost:3000

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth routes
│   ├── (dashboard)/      # Dashboard routes
│   ├── admin/            # Admin routes
│   └── api/              # API routes (if needed)
├── components/           # React components
│   ├── appointments/
│   ├── dashboard/
│   ├── modals/
│   └── shared/
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and helpers
├── queries/              # React Query hooks
├── store/                # Zustand stores
├── types/                # TypeScript types
└── styles/               # Global styles
```

## Pages

- `/` - Home
- `/login` - Login (to be implemented)
- `/signup` - Signup (to be implemented)
- `/dashboard` - Coworker dashboard
- `/admin` - Admin dashboard
- `/admin/authorizations` - Authorization requests
- `/admin/invoices` - Invoice management

## Components

### Shared Components

- `Button` - Reusable button
- `Modal` - Modal dialog
- `Card` - Card container
- `Badge` - Status badge
- `Alert` - Alert message

Located in `@eqb/ui-components`

## State Management

### Zustand Stores

```typescript
import { useUserStore } from '@/store/userStore';

const { user, setUser } = useUserStore();
```

## Data Fetching

### React Query

```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['appointments'],
  queryFn: () => fetch('/api/appointments').then(r => r.json()),
});
```

## Styling

TailwindCSS is configured in `tailwind.config.ts`

```tsx
<div className="bg-blue-600 text-white p-4 rounded-lg">
  Styled content
</div>
```

## Forms

React Hook Form + Zod validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

## Testing

```bash
pnpm run test
pnpm run test:coverage
```

## Build & Deploy

### Production Build

```bash
pnpm run build
pnpm run start
```

### Environment Check

```bash
# Verify env vars are set
echo $NEXT_PUBLIC_API_URL
```

## Performance

- Image optimization with Next.js Image
- Lazy loading for routes
- Code splitting via dynamic imports
- CSS-in-JS with TailwindCSS

## Best Practices

1. Use TypeScript for all components
2. Keep components small and focused
3. Use React Query for server state
4. Use Zustand for client state
5. Follow naming conventions (PascalCase for components)
6. Document complex logic with comments
