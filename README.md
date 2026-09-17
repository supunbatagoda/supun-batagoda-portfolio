# Nuxt 4 + NestJS + MySQL 8.4 Fullstack Portfolio Boilerplate

A production-grade, secure, and modern fullstack boilerplate.

## 🛠 Tech Stack

### Frontend

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3 + TypeScript)
- **UI & Styling**: [Nuxt UI](https://ui.nuxt.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/) (`@pinia/nuxt`)
- **Linting & Formatting**: ESLint + Prettier

### Backend

- **Framework**: [NestJS](https://nestjs.com/) (TypeScript)
- **Database**: MySQL 8.4 (via Docker Compose)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev/) (`nestjs-zod`)
- **Linting & Formatting**: ESLint Flat Config + Prettier

---

## 📂 Project Structure

```text
├── docker-compose.yml       # MySQL 8.4 container configuration (127.0.0.1:3306)
├── package.json             # Root monorepo scripts
├── .gitignore               # Root git ignore rules
├── frontend/                # Nuxt 4 application
│   ├── app/                 # Nuxt 4 application directory
│   │   ├── app.vue          # Root template with Nuxt UI <UApp>
│   │   ├── pages/           # File-based routing (index.vue)
│   │   ├── components/      # Vue components (AppHeader, ProjectCard)
│   │   ├── stores/          # Pinia stores (portfolio.ts)
│   │   └── composables/     # Composables (useApi.ts)
│   ├── nuxt.config.ts       # Nuxt 4 configuration
│   ├── package.json         # Frontend dependencies & scripts
│   ├── tsconfig.json        # Frontend TypeScript config
│   └── .env.example         # Frontend environment template
└── backend/                 # NestJS application
    ├── src/
    │   ├── main.ts          # Application bootstrap with Zod pipe & 127.0.0.1 host binding
    │   ├── app.module.ts    # Root NestJS module
    │   ├── prisma/          # Prisma client service & module
    │   ├── health/          # Health check endpoint (/api/health)
    │   └── projects/        # Sample CRUD module with Zod DTOs (/api/projects)
    ├── prisma/
    │   ├── schema.prisma    # MySQL 8.4 database schema
    │   └── seed.ts          # Database seeder script
    ├── package.json         # Backend dependencies & scripts
    ├── tsconfig.json        # Backend TypeScript config
    └── .env.example         # Backend environment template
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites

- **Node.js**: v20.x or v22.x
- **Docker & Docker Compose**: For running MySQL 8.4 locally

### 2. Start MySQL 8.4 Container

```bash
# Start MySQL 8.4 container in background
docker compose up -d

# Check status
docker compose ps
```

### 3. Setup Backend

```bash
cd backend

# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Run database migrations and generate Prisma client
npm run prisma:migrate

# (Optional) Seed the database with sample data
npm run prisma:seed

# Start NestJS in development mode
npm run start:dev
```

Backend API will be accessible at: `http://127.0.0.1:3001/api`

- Health check: `http://127.0.0.1:3001/api/health`
- Projects API: `http://127.0.0.1:3001/api/projects`

### 4. Setup Frontend

```bash
cd frontend

# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Start Nuxt 4 development server
npm run dev
```

Frontend will be accessible at: `http://localhost:3000`

---

## ⚡ Root Convenience Scripts

From the repository root, you can run:

```bash
# Development
npm run dev:backend       # Start NestJS dev server
npm run dev:frontend      # Start Nuxt 4 dev server

# Building
npm run build:backend     # Build NestJS to dist/
npm run build:frontend    # Build Nuxt 4 application

# Linting & Formatting
npm run lint              # Run linting on both frontend and backend
npm run format:backend    # Format backend code with Prettier

# Database
npm run db:up             # Start MySQL 8.4 container
npm run db:down           # Stop MySQL 8.4 container
npm run db:migrate        # Run Prisma migrations
npm run db:seed           # Run database seeder
```

---

## 🔒 Security & Best Practices

- **Host Binding**: In development and testing, both the NestJS server and Docker container bind strictly to `127.0.0.1`, never exposing ports to `0.0.0.0`.
- **Database Safety**: All database interactions utilize Prisma ORM with parameterized queries, preventing SQL injection vulnerabilities.
- **Input Validation**: All incoming requests are validated at runtime against strict Zod schemas via `ZodValidationPipe`.
- **XSS Prevention**: Safe Vue 3 templating with framework-native auto-escaping; no unsafe `v-html` injections.
- **CORS Configuration**: Restricts API calls to authorized origins (`CORS_ORIGIN`).

---

## 🚢 CI/CD & Deployment

The frontend build output is configured via `nitro.output.publicDir: 'dist'` to integrate seamlessly with `.github/workflows/portfolio.yml`, deploying to your VPS target directory (`/var/www/meeshlabs/supunbatagoda`).
