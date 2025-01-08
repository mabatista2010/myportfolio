import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Crear bucket si no existe (solo cuando estemos autenticados)
export const initStorage = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    const { data, error } = await supabase.storage.createBucket('images', {
      public: true,
      fileSizeLimit: 1024 * 1024 * 2, // 2MB
    })
    if (error && error.message !== 'Bucket already exists') {
      console.error('Error creating bucket:', error)
    }
  }
} 