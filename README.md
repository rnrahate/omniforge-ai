# OmniForge AI

OmniForge AI is a multi-platform content-creation and brand-intelligence SaaS.
The first milestone is a modular monorepo: a Next.js web client, a FastAPI AI
service, and Supabase migrations/policies. It intentionally has no microservice
mesh, queue, vector database, Redis, LangGraph, or model fine-tuning layer.

## Architecture

```text
Browser -> Next.js web -> FastAPI AI/document API -> Gemini
     \-> Supabase Auth, PostgreSQL and private Storage
```

The browser only receives public Supabase configuration. Gemini and Supabase
service-role credentials are server-only. The FastAPI API verifies Supabase
bearer tokens before protected operations.

See [docs/architecture.md](docs/architecture.md) and
[docs/local-development.md](docs/local-development.md) for the maintained
architecture decisions and setup instructions.

## Quick start

1. Create environment files from `apps/web/.env.example` and
   `apps/api/.env.example`.
2. Install JavaScript dependencies with `npm install`.
3. Create a Python virtual environment and install API dependencies.
4. Start Supabase locally, then start the web and API apps in separate terminals.

Detailed, Windows-friendly commands are in the local-development guide.
