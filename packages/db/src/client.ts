import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/database'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(url, anon)

// Server-side only — never import in client components
export function createAdminClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL ?? url,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
