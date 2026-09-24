# Supun Batagoda Portfolio

Initial full-stack milestone: a "Coming Soon" page with a live countdown and an
email subscription form, backed by a real Next.js → NestJS → Prisma → MySQL
pipeline. This is intentionally small — the full portfolio is built on top of
this foundation later.

## Architecture

Next.js + NestJS + Prisma + MySQL + Redis

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

Redis is provisioned but not used by application logic yet — it's there for
future caching, rate limiting, and background jobs.

## Requirements

- Node.js 20+
- Docker
- Docker Compose

## Local Development

```bash
cp .env.example .env
docker compose up --build
```

Then:

- Frontend: http://localhost:3000
- Backend health: http://localhost:4000/api/v1/health

### Verify the backend

```bash
curl http://localhost:4000/api/v1/health
# {"status":"ok"}

curl -X POST http://localhost:4000/api/v1/subscriptions \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
# {"message":"Thanks! We'll notify you when the portfolio launches."}
```

## API

| Method | Path                    | Description                          |
| ------ | ----------------------- | ------------------------------------ |
| POST   | `/api/v1/subscriptions` | Subscribe an email for launch notice |
| GET    | `/api/v1/health`        | Health check                         |

## Project Structure

```text
supun-batagoda-portfolio/
├── frontend/         Next.js (App Router) — Coming Soon page
├── backend/          NestJS + Prisma — subscriptions API
├── docker-compose.yml
├── .env.example
└── README.md
```

## Scope

This milestone deliberately excludes: full portfolio pages, authentication, an
admin dashboard, email provider integration, AWS/S3, Redis application logic,
CI/CD, production deployment, and microservices. It proves the
frontend → backend → database connection end to end; everything else is built
on top of it next.
