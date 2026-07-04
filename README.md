# paper

A simple, fast to-do app. Next.js (App Router) + Prisma + SQLite.

## Getting started

```bash
npm install          # also runs `prisma generate` via postinstall
npm run db:migrate   # creates prisma/dev.db and applies migrations
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 15** (App Router, TypeScript, Tailwind)
- **Prisma 7** + SQLite (via the `@prisma/adapter-libsql` driver adapter) for persistence. Swappable to hosted Postgres later without touching app code — just the datasource + adapter in `src/lib/prisma.ts`.
- To-do CRUD is implemented as Next.js Server Actions (`src/app/actions.ts`), no separate API layer needed yet.

## Deploy

Production deploy is not wired up yet — the earlier GitHub Pages static-export pipeline (`.github/workflows/deploy.yml`) can no longer serve this app now that it has server actions and a database. It's paused (manual-dispatch only) pending a Node-capable host decision.
