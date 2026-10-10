# Local development

## Prerequisites

- Node.js 22+
- Python 3.11+
- Docker Desktop and the Supabase CLI for the local Supabase stack

## Environment

From the repository root, create these untracked files:

```powershell
Copy-Item apps/web/.env.example apps/web/.env.local
Copy-Item apps/api/.env.example apps/api/.env
```

Fill the values from your Supabase project or `supabase status`. Only variables
whose names start with `NEXT_PUBLIC_` may be exposed to the browser. Never put
`GEMINI_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in the web environment.

## Install and run

```powershell
npm install
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -e "./apps/api[dev]"
supabase start
npm run dev:web
```

In a second terminal, with the virtual environment activated:

```powershell
uvicorn app.main:app --app-dir apps/api --reload --port 8000
```

Visit `http://localhost:3000`; API readiness is at
`http://localhost:8000/health`.

## Validation

```powershell
npm run lint
npm run test:web
pytest apps/api/tests
```

## Database workflow

Create a migration for every database change. Apply migrations locally before
testing user flows, inspect generated SQL, then deploy through the approved
Supabase environment workflow. Do not modify production tables manually.
