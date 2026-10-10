-- OmniForge AI first-milestone schema. Apply with the Supabase CLI; do not run
-- ad hoc against production.
create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  owner_id uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table public.content_jobs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  requested_by uuid not null references auth.users(id) on delete restrict,
  platform text not null check (platform in ('linkedin', 'x', 'instagram', 'blog')),
  brief text not null check (char_length(brief) between 20 and 10000),
  voice text not null check (char_length(voice) between 2 and 80),
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  result_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  uploaded_by uuid not null references auth.users(id) on delete restrict,
  storage_path text not null unique,
  original_filename text not null check (char_length(original_filename) between 1 and 255),
  content_type text not null,
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 10485760),
  extraction_status text not null default 'pending' check (extraction_status in ('pending', 'processing', 'completed', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index content_jobs_workspace_created_idx on public.content_jobs (workspace_id, created_at desc);
create index documents_workspace_created_idx on public.documents (workspace_id, created_at desc);
create index workspace_members_user_idx on public.workspace_members (user_id, workspace_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute procedure public.set_updated_at();
create trigger workspaces_set_updated_at before update on public.workspaces
for each row execute procedure public.set_updated_at();
create trigger content_jobs_set_updated_at before update on public.content_jobs
for each row execute procedure public.set_updated_at();
create trigger documents_set_updated_at before update on public.documents
for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.handle_new_workspace()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.workspace_members (workspace_id, user_id, role)
  values (new.id, new.owner_id, 'owner');
  return new;
end;
$$;

create trigger on_workspace_created
after insert on public.workspaces
for each row execute procedure public.handle_new_workspace();

-- SECURITY DEFINER avoids recursive RLS evaluation while enforcing membership.
create or replace function public.is_workspace_member(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = target_workspace_id and user_id = auth.uid()
  );
$$;

revoke all on function public.is_workspace_member(uuid) from public;
grant execute on function public.is_workspace_member(uuid) to authenticated;

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.content_jobs enable row level security;
alter table public.documents enable row level security;

create policy "profiles are visible to their owner" on public.profiles
for select to authenticated using ((select auth.uid()) = id);
create policy "profiles are editable by their owner" on public.profiles
for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "members can view workspaces" on public.workspaces
for select to authenticated using (public.is_workspace_member(id));
create policy "users can create owned workspaces" on public.workspaces
for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "only owners can update workspaces" on public.workspaces
for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "only owners can delete workspaces" on public.workspaces
for delete to authenticated using ((select auth.uid()) = owner_id);

create policy "members can view membership" on public.workspace_members
for select to authenticated using (public.is_workspace_member(workspace_id));
create policy "owners can add members" on public.workspace_members
for insert to authenticated with check (
  exists (select 1 from public.workspaces where id = workspace_id and owner_id = auth.uid())
);
create policy "owners can change membership" on public.workspace_members
for update to authenticated using (
  exists (select 1 from public.workspaces where id = workspace_id and owner_id = auth.uid())
) with check (
  exists (select 1 from public.workspaces where id = workspace_id and owner_id = auth.uid())
);
create policy "owners can remove members" on public.workspace_members
for delete to authenticated using (
  user_id <> auth.uid()
  and exists (select 1 from public.workspaces where id = workspace_id and owner_id = auth.uid())
);

create policy "members can view content jobs" on public.content_jobs
for select to authenticated using (public.is_workspace_member(workspace_id));
create policy "members can request content jobs" on public.content_jobs
for insert to authenticated with check (
  requested_by = auth.uid() and public.is_workspace_member(workspace_id)
);
create policy "requesters can update their pending jobs" on public.content_jobs
for update to authenticated using (requested_by = auth.uid() and status = 'pending')
with check (requested_by = auth.uid() and public.is_workspace_member(workspace_id));

create policy "members can view documents" on public.documents
for select to authenticated using (public.is_workspace_member(workspace_id));
create policy "members can register documents" on public.documents
for insert to authenticated with check (
  uploaded_by = auth.uid() and public.is_workspace_member(workspace_id)
);
create policy "uploaders can update their documents" on public.documents
for update to authenticated using (uploaded_by = auth.uid())
with check (uploaded_by = auth.uid() and public.is_workspace_member(workspace_id));
create policy "uploaders can delete their documents" on public.documents
for delete to authenticated using (uploaded_by = auth.uid());

insert into storage.buckets (id, name, public)
values ('source-documents', 'source-documents', false)
on conflict (id) do update set public = false;

-- Object paths must be {workspace_uuid}/{document_uuid}/{safe_filename}.
create policy "workspace members can read source documents" on storage.objects
for select to authenticated using (
  bucket_id = 'source-documents'
  and public.is_workspace_member((storage.foldername(name))[1]::uuid)
);
create policy "workspace members can upload source documents" on storage.objects
for insert to authenticated with check (
  bucket_id = 'source-documents'
  and public.is_workspace_member((storage.foldername(name))[1]::uuid)
);
create policy "workspace members can delete source documents" on storage.objects
for delete to authenticated using (
  bucket_id = 'source-documents'
  and public.is_workspace_member((storage.foldername(name))[1]::uuid)
);
