# API contracts

FastAPI publishes the authoritative OpenAPI document at `/openapi.json`.
This package is reserved for generated TypeScript clients or shared, transport-
only types once a build step is needed. Domain logic remains in the owning app.
