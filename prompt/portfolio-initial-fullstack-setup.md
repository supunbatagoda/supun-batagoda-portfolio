# Portfolio Initial Full-Stack Setup

## Goal

Create the initial full-stack structure for the portfolio:

- `frontend/` — Next.js + React + TypeScript
- `backend/` — NestJS + Node.js + TypeScript
- A simple **Coming Soon** page with a live countdown
- An email subscription form: **Get notified**
- The form calls the NestJS API
- NestJS validates and stores the subscription in MySQL
- CORS is configured between frontend and backend
- Docker Compose runs frontend, backend, MySQL, and Redis
- The initial implementation should prove the complete frontend → backend → database connection

The first milestone is intentionally small. Do not implement the complete portfolio yet.

---

# Target Architecture

```text
                         Browser
                            |
                            v
                    +---------------+
                    |   Next.js     |
                    |   Frontend    |
                    |    :3000      |
                    +-------+-------+
                            |
                    POST /api/v1/
                       subscriptions
                            |
                            v
                    +---------------+
                    |    NestJS     |
                    |     API       |
                    |    :4000      |
                    +-------+-------+
                            |
                    +-------+-------+
                    |               |
                    v               v
                +-------+       +-------+
                | MySQL |       | Redis |
                | 8.4   |       |       |
                +-------+       +-------+
```

For the first milestone, Redis does not need to be used by application logic. Include it in Docker Compose so the infrastructure is ready for future features such as caching, rate limiting, queues, or background jobs.

---

# Repository Structure

Create:

```text
supun-batagoda-portfolio/
│
├── frontend/
├── backend/
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

After implementation:

```text
supun-batagoda-portfolio/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── public/
│   ├── Dockerfile
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── subscriptions/
│   │   ├── database/
│   │   ├── health/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── Dockerfile
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

# 1. Initialize the Frontend

Use the current stable Next.js project generator.

```bash
npx create-next-app@latest frontend
```

Choose:

```text
TypeScript              Yes
ESLint                  Yes
Tailwind CSS            Yes
src/ directory          Yes
App Router              Yes
Turbopack               Yes
Import alias            @/*
```

The frontend should use the Next.js App Router.

---

# 2. Initialize the Backend

Install the NestJS CLI and create the application:

```bash
npm i -g @nestjs/cli
nest new backend
```

Choose:

```text
npm
```

Use TypeScript.

---

# 3. Backend Dependencies

Inside `backend/` install:

```bash
npm install @prisma/client class-validator class-transformer
npm install @nestjs/config
npm install helmet
```

Development dependencies:

```bash
npm install -D prisma
```

Initialize Prisma:

```bash
npx prisma init
```

---

# 4. Backend Folder Structure

Use a feature/module-oriented structure.

```text
backend/src/
│
├── subscriptions/
│   ├── dto/
│   │   └── create-subscription.dto.ts
│   ├── subscriptions.controller.ts
│   ├── subscriptions.service.ts
│   └── subscriptions.module.ts
│
├── health/
│   ├── health.controller.ts
│   └── health.module.ts
│
├── database/
│   ├── database.module.ts
│   └── prisma.service.ts
│
├── app.module.ts
└── main.ts
```

Do not create unnecessary layers such as repositories, use cases, domain entities, etc. for this initial portfolio milestone.

They can be introduced later if the application actually needs them.

---

# 5. Environment Variables

Root `.env.example`:

```env
# Database
MYSQL_DATABASE=portfolio
MYSQL_USER=portfolio
MYSQL_PASSWORD=portfolio_password
MYSQL_ROOT_PASSWORD=root_password

# Backend
DATABASE_URL=mysql://portfolio:portfolio_password@mysql:3306/portfolio
BACKEND_PORT=4000
FRONTEND_URL=http://localhost:3000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

Do not commit real `.env` files.

Create:

```text
.env
```

locally from `.env.example`.

---

# 6. Prisma Database Schema

Use MySQL.

`backend/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Subscription {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("subscriptions")
}
```

Run:

```bash
npx prisma migrate dev --name create_subscriptions
```

Generate the client:

```bash
npx prisma generate
```

---

# 7. NestJS API

Create:

```text
POST /api/v1/subscriptions
```

Request:

```json
{
  "email": "someone@example.com"
}
```

Success response:

```json
{
  "message": "Thanks! We'll notify you when the portfolio launches."
}
```

For an already subscribed email:

```json
{
  "message": "This email is already subscribed."
}
```

Use HTTP status `201` for a successful new subscription.

Use an appropriate `4xx` response for invalid email input.

---

# 8. DTO Validation

`create-subscription.dto.ts` should validate the email.

Use:

```typescript
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
```

Enable global validation in `main.ts`:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }),
);
```

---

# 9. CORS

Configure NestJS to accept requests from the frontend.

Example:

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});
```

Do not use `origin: '*'` for the actual application configuration.

---

# 10. API Prefix

Configure:

```typescript
app.setGlobalPrefix('api/v1');
```

Therefore:

```text
POST http://localhost:4000/api/v1/subscriptions
GET  http://localhost:4000/api/v1/health
```

---

# 11. Health Endpoint

Create:

```text
GET /api/v1/health
```

Response:

```json
{
  "status": "ok"
}
```

This will be useful for Docker health checks and future deployment.

---

# 12. Frontend Structure

Use:

```text
frontend/src/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ComingSoon.tsx
│   ├── Countdown.tsx
│   └── SubscribeForm.tsx
│
├── lib/
│   └── api.ts
│
└── types/
    └── api.ts
```

Keep the first implementation simple.

---

# 13. Coming Soon Page

The home page should contain:

```text
------------------------------------------------

              SUPUN BATAGODA

          Software Engineer

       My portfolio is coming soon.

              12 : 08 : 35 : 42
              Days Hours Min Sec

        ┌──────────────────────────┐
        │ Enter your email         │
        │                          │
        │ [ Get Notified ]         │
        └──────────────────────────┘

      We will notify you when it launches.

------------------------------------------------
```

The exact visual design is up to the implementation, but it should look professional and minimal.

Use responsive design.

---

# 14. Countdown

Create a reusable:

```text
Countdown.tsx
```

The countdown should count down to a configurable launch date.

Do not hard-code the countdown calculation directly inside `page.tsx`.

Example:

```typescript
const launchDate = new Date('2026-12-31T00:00:00+05:30');
```

Display:

```text
Days
Hours
Minutes
Seconds
```

The countdown must update every second.

Clean up the interval when the component unmounts.

If the launch date has passed, display:

```text
Coming Soon
```

instead of negative values.

---

# 15. Subscription Form

Create:

```text
SubscribeForm.tsx
```

The form should:

1. Accept an email address.
2. Validate the email on the client.
3. Disable the button while submitting.
4. Call the NestJS API.
5. Show a success message.
6. Show an API validation/error message.
7. Clear the form after successful subscription.

API request:

```http
POST http://localhost:4000/api/v1/subscriptions
Content-Type: application/json

{
  "email": "user@example.com"
}
```

---

# 16. Frontend API Client

Create:

```text
frontend/src/lib/api.ts
```

Do not scatter `fetch()` calls throughout React components.

Example concept:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function subscribe(email: string) {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? 'Something went wrong');
  }

  return data;
}
```

---

# 17. Docker Compose

Create:

```text
docker-compose.yml
```

Services:

```text
frontend
backend
mysql
redis
```

Expected local ports:

```text
Frontend     http://localhost:3000
Backend      http://localhost:4000
MySQL        localhost:3306
Redis        localhost:6379
```

The backend container must connect to MySQL using:

```text
mysql:3306
```

not:

```text
localhost:3306
```

because `localhost` inside the backend container refers to the backend container itself.

---

# 18. Docker Compose Requirements

MySQL:

```text
image: mysql:8.4
```

Redis:

```text
image: redis:alpine
```

Create persistent MySQL storage:

```text
mysql_data:/var/lib/mysql
```

Create a shared network:

```text
portfolio_network
```

Services should use the same Docker network.

Add a MySQL health check so the backend does not start before MySQL is ready.

---

# 19. Development Workflow

The preferred workflow should be:

```bash
docker compose up --build
```

Then:

```text
http://localhost:3000
```

should show the Coming Soon page.

Test backend:

```bash
curl http://localhost:4000/api/v1/health
```

Expected:

```json
{
  "status": "ok"
}
```

Test subscription:

```bash
curl -X POST http://localhost:4000/api/v1/subscriptions \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Expected:

```json
{
  "message": "Thanks! We'll notify you when the portfolio launches."
}
```

---

# 20. End-to-End Test

The most important test is:

```text
Browser
   │
   │ Enter email
   ▼
React / Next.js
   │
   │ POST /api/v1/subscriptions
   ▼
NestJS Controller
   │
   ▼
DTO Validation
   │
   ▼
Subscriptions Service
   │
   ▼
Prisma
   │
   ▼
MySQL
   │
   ▼
Response
   │
   ▼
Next.js
   │
   ▼
Success message
```

Verify the email exists in MySQL.

This proves:

```text
Next.js
   ↓
HTTP
   ↓
NestJS
   ↓
Prisma
   ↓
MySQL
```

is working correctly.

---

# 21. Security Basics

Implement the following from the beginning:

- Environment variables for secrets.
- `helmet`.
- CORS restricted to the frontend origin.
- DTO validation.
- Prisma parameterized queries.
- No database credentials in Git.
- No `.env` files committed.
- Do not expose MySQL publicly in production.
- Do not expose Redis publicly in production.

For this initial milestone, do not build authentication or an admin dashboard yet.

---

# 22. README

Document:

```text
# Supun Batagoda Portfolio

## Architecture

Next.js + NestJS + Prisma + MySQL + Redis

## Requirements

- Node.js
- Docker
- Docker Compose

## Local Development

docker compose up --build

## URLs

Frontend:
http://localhost:3000

Backend:
http://localhost:4000

Health:
http://localhost:4000/api/v1/health

## API

POST /api/v1/subscriptions
GET /api/v1/health
```

Also include an architecture diagram.

---

# 23. Important Scope Limit

For this first milestone, DO NOT implement:

- Full portfolio pages
- Authentication
- Admin dashboard
- Email provider integration
- AWS/S3
- Redis application logic
- CI/CD
- Production deployment
- Microservices

The goal is only:

```text
Next.js
   ↓
Coming Soon page
   ↓
Email subscription
   ↓
NestJS API
   ↓
Prisma
   ↓
MySQL
```

Once this works reliably, we can build the actual portfolio features on top of it.

---

# Definition of Done

The implementation is complete when all of these work:

- [ ] Repository contains `frontend` and `backend`.
- [ ] Frontend runs with Next.js.
- [ ] Backend runs with NestJS.
- [ ] MySQL 8.4 runs through Docker.
- [ ] Redis runs through Docker.
- [ ] Prisma connects to MySQL.
- [ ] Database migration creates `subscriptions`.
- [ ] NestJS health endpoint works.
- [ ] NestJS CORS is configured.
- [ ] Next.js displays Coming Soon page.
- [ ] Countdown updates every second.
- [ ] Email subscription form works.
- [ ] Invalid emails are rejected.
- [ ] Valid emails reach NestJS.
- [ ] Subscription is stored in MySQL.
- [ ] Duplicate emails are handled.
- [ ] Frontend displays API success/error messages.
- [ ] Entire stack starts with:

```bash
docker compose up --build
```

The result should be a clean, minimal, production-oriented foundation that can later be expanded into the full portfolio application.
