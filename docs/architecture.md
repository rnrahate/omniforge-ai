# Architecture decisions

## Current milestone

- Next.js App Router and FastAPI are separate local processes.
- The frontend is organized into routes, reusable components, feature modules,
  typed API clients, and utilities.
- FastAPI separates routers, Pydantic schemas, services, configuration, and tests.
- `NEXT_PUBLIC_API_BASE_URL` is the sole browser-visible integration setting.
- CORS permits only explicitly configured frontend origins.

## Deliberately deferred

AI providers, authentication, persistence, file storage, background jobs, and
database migrations are not part of this scaffold. Add each behind a dedicated
design decision and test boundary when its product requirements are known.
