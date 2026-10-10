# OmniForge AI

OmniForge AI starts as a focused full-stack foundation: a Next.js App Router
frontend and a separate FastAPI backend. This milestone intentionally contains
no AI provider, authentication, database, or external service integration.

## Structure

```text
apps/
  web/                  Next.js, TypeScript, Tailwind, shadcn-compatible UI
    app/                routes: / and /status
    components/         reusable UI primitives
    features/health/    health-status feature module
    lib/api/            typed FastAPI client
  api/                  FastAPI and Pydantic service
    app/routers/        HTTP routes
    app/schemas/        Pydantic request/response types
    app/services/       application logic
    app/core/           configuration
    tests/              API tests
```

## API

- `GET /api/health` returns the liveness of the FastAPI process.
- The web client calls it through `NEXT_PUBLIC_API_BASE_URL`.
- Local CORS is explicitly limited to `http://localhost:3000` by default. Set
  `CORS_ORIGINS` to a comma-separated allowlist when using another frontend origin.

## Windows PowerShell

```powershell
# Install frontend dependencies (run once)
npm install

# Create local environment files
Copy-Item apps/web/.env.example apps/web/.env.local
Copy-Item apps/api/.env.example apps/api/.env

# Create and install the isolated Python environment (run once)
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -e ".\apps\api[dev]"

# Terminal 1: FastAPI
.\.venv\Scripts\python.exe -m uvicorn app.main:app --app-dir apps/api --reload --port 8000

# Terminal 2: Next.js
npm run dev:web
```

Open `http://localhost:3000` and `http://localhost:8000/api/health`.

## macOS and Linux

```bash
npm install
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
python3 -m venv .venv
.venv/bin/python -m pip install -e './apps/api[dev]'

# Terminal 1
.venv/bin/python -m uvicorn app.main:app --app-dir apps/api --reload --port 8000

# Terminal 2
npm run dev:web
```

## Checks

```powershell
npm run lint
npm run test:web
npm run build:web
npm run test:api
```

The web health indicator reports the live response from FastAPI; it does not
pretend unavailable services are working.
