-- Additive, service-role-only consent ledger for optional VGA email offers.
create table if not exists public.marketing_email_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_hash text not null,
  controller_id text not null check (controller_id = '21873446'),
  purpose_id text not null check (purpose_id = 'direct_marketing_email'),
  channel text not null check (channel = 'email'),
  scope_id text not null check (scope_id = 'vga_passenger_consumer_rights_v1'),
  locale text not null check (locale in ('sr', 'en')),
  consent_text text not null,
  consent_version text not null,
  consent_text_hash text not null,
  privacy_policy_version text not null,
  source_path text not null,
  status text not null check (status in ('pending', 'granted', 'withdrawn', 'expired')),
  requested_at timestamptz not null default now(),
  contact_verified_at timestamptz,
  confirmed_at timestamptz,
  withdrawn_at timestamptz,
  expires_at timestamptz,
  confirmation_token_hash text,
  confirmation_expires_at timestamptz,
  unsubscribe_token_hash text not null,
  last_explicit_confirmation_at timestamptz,
  legal_hold_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (email_hash, controller_id, purpose_id, channel, scope_id),
  unique (confirmation_token_hash),
  unique (unsubscribe_token_hash)
);

create table if not exists public.marketing_consent_events (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.marketing_email_subscriptions(id) on delete cascade,
  event_type text not null check (event_type in ('requested', 'confirmation_sent', 'confirmed', 'withdrawn', 'expired', 'management_link_sent')),
  occurred_at timestamptz not null default now(),
  locale text not null check (locale in ('sr', 'en')),
  source_path text not null,
  actor text not null check (actor in ('subscriber', 'system', 'operator')),
  evidence jsonb not null default '{}'::jsonb
);

create table if not exists public.marketing_email_suppressions (
  email_hash text not null,
  controller_id text not null check (controller_id = '21873446'),
  purpose_id text not null check (purpose_id = 'direct_marketing_email'),
  channel text not null check (channel = 'email'),
  scope_id text not null check (scope_id = 'vga_passenger_consumer_rights_v1'),
  suppressed_at timestamptz not null default now(),
  reason text not null,
  review_due_at timestamptz not null,
  legal_hold_until timestamptz,
  updated_at timestamptz not null default now(),
  primary key (email_hash, controller_id, purpose_id, channel, scope_id)
);

create index if not exists marketing_email_active_idx
  on public.marketing_email_subscriptions (controller_id, purpose_id, channel, scope_id, status, expires_at);
create index if not exists marketing_consent_events_subscription_idx
  on public.marketing_consent_events (subscription_id, occurred_at desc);

alter table public.marketing_email_subscriptions enable row level security;
alter table public.marketing_consent_events enable row level security;
alter table public.marketing_email_suppressions enable row level security;

revoke all on public.marketing_email_subscriptions from anon, authenticated;
revoke all on public.marketing_consent_events from anon, authenticated;
revoke all on public.marketing_email_suppressions from anon, authenticated;

comment on table public.marketing_email_subscriptions is
  'Separate consent ledger for VGA email offers; never use as claim or service-message authority.';
comment on table public.marketing_email_suppressions is
  'Minimal send-blocking records kept outside the active marketing list.';
