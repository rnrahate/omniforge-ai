# Supabase

`migrations/` is the authoritative schema and RLS source. The first migration
creates workspace-scoped tables and a private `source-documents` bucket.

For uploads, use a path in this exact form:

```text
{workspace_uuid}/{document_uuid}/{safe_filename}
```

The FastAPI document validator must run before creating the database record or
issuing an upload URL. Browser uploads require authenticated Supabase sessions;
the service role must never be sent to the browser.
