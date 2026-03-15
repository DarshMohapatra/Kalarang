-- Run this SQL in your Supabase SQL Editor to create the orders table.
-- Go to: Supabase Dashboard → SQL Editor → New Query → Paste & Run

create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  order_id text not null unique,
  user_id uuid references auth.users(id) on delete cascade,
  user_name text,
  user_email text,
  items jsonb not null default '[]',
  total numeric not null default 0,
  shipping numeric not null default 0,
  address jsonb,
  payment_method text,
  status text not null default 'Confirmed',
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table orders enable row level security;

-- Users can read their own orders
create policy "Users can view own orders"
  on orders for select
  using (auth.uid() = user_id);

-- Users can insert their own orders
create policy "Users can insert own orders"
  on orders for insert
  with check (auth.uid() = user_id);

-- Allow anyone to look up an order by order_id (for tracking)
create policy "Anyone can track orders by order_id"
  on orders for select
  using (true);

-- ============================================================
-- Password reset function (run this too)
-- Allows users to reset password directly without email flow
-- ============================================================
create or replace function reset_user_password(user_email text, new_password text)
returns json
language plpgsql
security definer
as $$
declare
  uid uuid;
begin
  select id into uid from auth.users where email = user_email;
  if uid is null then
    return json_build_object('success', false, 'error', 'No account found with this email');
  end if;
  update auth.users set encrypted_password = crypt(new_password, gen_salt('bf')) where id = uid;
  return json_build_object('success', true);
end;
$$;

-- ============================================================
-- Auto-confirm user email function
-- Fixes "Email not confirmed" error on signup
-- ============================================================
create or replace function confirm_user_email(user_email text)
returns json
language plpgsql
security definer
as $$
declare
  uid uuid;
begin
  select id into uid from auth.users where email = user_email;
  if uid is null then
    return json_build_object('success', false, 'error', 'User not found');
  end if;
  update auth.users set email_confirmed_at = now() where id = uid and email_confirmed_at is null;
  return json_build_object('success', true);
end;
$$;
