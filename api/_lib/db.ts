import { neon } from '@neondatabase/serverless'

/** One connection string, from Vercel's Neon integration (DATABASE_URL) or the older POSTGRES_URL. */
export const dbUrl = () => process.env.DATABASE_URL || process.env.POSTGRES_URL || ''
export const dbReady = () => !!dbUrl()

let ready: Promise<void> | null = null

/** The tables are created on first use, so connecting a database is the only setup step. */
export function db() {
  const sql = neon(dbUrl())
  if (!ready) {
    ready = (async () => {
      await sql`create table if not exists enquiries (
        id bigserial primary key,
        created_at timestamptz not null default now(),
        name text not null,
        email text not null,
        organisation text,
        role text,
        topic text not null,
        subject text,
        message text not null,
        source_path text,
        status text not null default 'new',
        notified boolean not null default false,
        notify_error text,
        ip_hash text,
        user_agent text
      )`
      await sql`create index if not exists enquiries_created_idx on enquiries (created_at desc)`
      await sql`create table if not exists portal_login_attempts (
        id bigserial primary key,
        ip_hash text not null,
        ok boolean not null,
        at timestamptz not null default now()
      )`
    })().catch(e => { ready = null; throw e })
  }
  return { sql, ready }
}
