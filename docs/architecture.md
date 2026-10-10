# OmniForge AI architecture

## First-milestone decisions

- **One web app and one API service.** The Next.js App Router application owns
  rendering and user-facing flows. FastAPI owns AI orchestration and document
  processing. These are modular boundaries, not independently deployed
  microservices at this stage.
- **Supabase is the system of record.** Auth, PostgreSQL, and Storage live in
  Supabase. All application tables use row-level security (RLS).
- **Gemini is server-side only.** FastAPI is the sole initial LLM integration;
  no provider key is sent to a browser or stored in the database.
- **Contract-first API.** Pydantic request/response models define OpenAPI for
  the API. The web app validates its form payloads separately with Zod.
- **No premature infrastructure.** Redis, a vector database, LangGraph,
  fine-tuning, and an event bus are deferred until usage demonstrates need.

## Bounded responsibilities

| Boundary | Responsibility |
| --- | --- |
| Next.js | Routes, UI, secure Supabase browser session handling, calling FastAPI with a user token |
| FastAPI | JWT verification, authorization, Gemini calls, prompt construction, document extraction and validation |
| Supabase | Identity, workspace-scoped relational data, private source-document storage |
| Gemini | Text generation only; never authorization or data ownership decisions |

## Initial API surface

- `GET /health` — process liveness; intentionally unauthenticated. Dependency
  readiness checks will be added with deployment monitoring.
- `POST /v1/content/generate` — authenticated Gemini generation for an allowed
  social platform. It is synchronous for the small first-milestone request.

Long-running documents and generation jobs will become persisted job records
before adding queues or workers. A client must never treat a successful HTTP
response as proof of persisted job completion.

## Security baseline

- Verify every protected FastAPI bearer token against Supabase JWKS.
- Enable RLS for all public application tables; scope all data to workspace
  membership.
- Keep `source-documents` private and derive access from the workspace UUID in
  the object path.
- Validate payloads at both trust boundaries (Zod in the web app, Pydantic in
  FastAPI). Do not render AI or document content as unsanitized HTML.
- Use explicit CORS origins, browser security headers, HTTPS in production, and
  PII-minimizing logs.
- Use service-role access only in a server-only repository layer where a
  user-context query cannot satisfy an operational requirement.

## Deferred decisions

Provider abstraction, asynchronous job workers, billing, workspace invitations,
analytics, retrieval augmentation, and fine-tuning require separate design
decisions when their product requirements are known.
