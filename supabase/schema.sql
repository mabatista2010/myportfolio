-- Crear tabla de aplicaciones
create table apps (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  app_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Función para actualizar el timestamp de updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger para actualizar updated_at automáticamente
create trigger set_updated_at
  before update on apps
  for each row
  execute procedure handle_updated_at();

-- Políticas RLS (Row Level Security)
alter table apps enable row level security;

-- Permitir lectura pública
create policy "Permitir lectura pública de apps"
  on apps for select
  using (true);

-- Permitir todas las operaciones al administrador
create policy "Permitir todas las operaciones al admin"
  on apps for all
  using (auth.role() = 'authenticated');

-- Crear tabla de usuarios
create table users (
  id uuid references auth.users on delete cascade primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger para crear automáticamente un registro en users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger que se ejecuta después de una inserción en auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Políticas RLS para users
alter table users enable row level security;

-- Los usuarios pueden ver su propio perfil
create policy "Los usuarios pueden ver su propio perfil"
  on users for select
  using (auth.uid() = id);

-- Los usuarios pueden actualizar su propio perfil
create policy "Los usuarios pueden actualizar su propio perfil"
  on users for update
  using (auth.uid() = id);

-- Solo permitir que los administradores vean todos los usuarios
create policy "Los administradores pueden ver todos los usuarios"
  on users for select
  using (auth.role() = 'authenticated'); 