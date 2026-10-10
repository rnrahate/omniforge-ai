# Local development reference

The complete Windows PowerShell and macOS/Linux setup commands are maintained
in the [root README](../README.md). Run the frontend and FastAPI service in
separate terminals; the frontend defaults to `http://localhost:3000` and the
API defaults to `http://localhost:8000`.

For a different frontend port, update both `apps/web/.env.local` and
`apps/api/.env` so `NEXT_PUBLIC_API_BASE_URL` and `CORS_ORIGINS` match.
