# EQB Platform - Documentation

## 📋 Documentazione Progetto

### 📖 Guide Disponibili

1. **[Setup Guide](./SETUP.md)** - Guida all'installazione e configurazione
2. **[Architecture](./ARCHITECTURE.md)** - Architettura tecnica del progetto
3. **[API Documentation](./API.md)** - Documentazione delle API REST
4. **[Database Schema](./DATABASE.md)** - Schema del database
5. **[Development Workflow](./WORKFLOW.md)** - Workflow di sviluppo

### 🚀 Quick Start

```bash
# Clone repository
git clone <repo-url>
cd eqb-platform

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local

# Start services
docker-compose up -d postgres redis

# Database setup
pnpm run db:migrate
pnpm run db:seed

# Start development
pnpm run dev
```

### 📁 Struttura Progetto

```
eqb-platform/
├── apps/
│   ├── api/          # Backend Express
│   └── web/          # Frontend Next.js
├── packages/
│   ├── shared-types/ # Tipi TypeScript condivisi
│   └── ui-components/# Componenti React riusabili
├── docs/             # Documentazione
└── docker-compose.yml
```

### 📅 Timeline Implementazione

| Fase | Durata | Descrizione |
|------|--------|-------------|
| **Phase 1** | 4 settimane | Setup + Auth + Appointments + Clients |
| **Phase 2** | 2 settimane | Backlog + Authorizations |
| **Phase 3** | 2 settimane | Invoicing + Payments |
| **Phase 4** | 2 settimane | Notifications + Dashboard |
| **Phase 5** | 2 settimane | Testing + Deployment |

### 🎯 Funzionalità Principali

#### Phase 1: Core Features
- ✅ Autenticazione & RBAC (Auth0)
- ✅ Gestione appuntamenti (CRUD)
- ✅ Profili clienti
- ✅ Documenti clienti (S3)

#### Phase 2: Business Logic
- ✅ Backlog automatico (23:59 UTC)
- ✅ Sistema autorizzazioni
- ✅ Modification requests

#### Phase 3: Fatturazione
- ✅ Monthly recap
- ✅ Invoice generation (PDF)
- ✅ Payment tracking
- ✅ Capacity monitoring (1.500h)

#### Phase 4: Operazioni
- ✅ Blocco prenotazioni
- ✅ Email & Notifiche
- ✅ Admin dashboard
- ✅ Analytics

#### Phase 5: Production
- ✅ Testing (80%+ coverage)
- ✅ Docker deployment
- ✅ CI/CD pipeline

### 💾 Database

**PostgreSQL 15** con Prisma ORM

Modelli principali:
- User (Admin, Coworker)
- Client
- Appointment
- ModificationRequest
- BacklogEntry
- MonthlyRecap
- Invoice
- BookingRestriction
- Communication
- AuditLog

### 🔐 Sicurezza

- Auth0 per autenticazione OAuth2
- JWT token validation
- Role-Based Access Control (RBAC)
- Audit logging di tutte le azioni
- CORS configurato
- Environment variables per secrets

### 📊 Capacità Centro

```
SALA ALLENAMENTO:      960 ore/mese
STANZE TRATTAMENTO:  + 540 ore/mese
─────────────────────────────────
TOTALE:              1.500 ore/mese
```

### 🚢 Deployment

Supporta:
- Docker & Docker Compose
- Kubernetes (configurazione futura)
- AWS (configurazione futura)
- CI/CD con GitHub Actions

### 🛠️ Tech Stack

**Frontend:**
- React 18 + Next.js 14
- TypeScript
- TailwindCSS
- React Query
- Zustand
- React Hook Form

**Backend:**
- Node.js 20
- Express 4
- Prisma ORM
- PostgreSQL 15
- Redis 7
- Bull (Job Queue)

**External Services:**
- Auth0 (Authentication)
- SendGrid (Email)
- AWS S3 (Storage)
- Firebase (Push Notifications)

### 📞 Support

Per domande o issues, contatta il team di sviluppo.

---

**Creato con ❤️ usando GitHub Copilot**
