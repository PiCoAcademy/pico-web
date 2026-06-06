-- RFQ requests from industrial.pico.ma
create table if not exists rfq_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  company     text not null,
  sector      text,
  name        text not null,
  email       text not null,
  phone       text,
  project_type text,
  brief       text,
  budget      text,
  timeline    text,
  status      text not null default 'new' check (status in ('new','contacted','quoted','closed'))
);

-- Orders from store.pico.ma
create table if not exists orders (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  status      text not null default 'pending' check (status in ('pending','paid','shipped','delivered','cancelled')),
  total_mad   numeric(10,2) not null,
  shipping    jsonb not null default '{}',
  stripe_payment_intent text
);

-- Order line items
create table if not exists order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  product_id  text not null,
  name        text not null,
  price_mad   numeric(10,2) not null,
  quantity    int not null default 1
);

-- Indexes
create index if not exists rfq_requests_created_at on rfq_requests(created_at desc);
create index if not exists orders_created_at on orders(created_at desc);
create index if not exists order_items_order_id on order_items(order_id);

-- Row Level Security (service role bypasses these)
alter table rfq_requests enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
