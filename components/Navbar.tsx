import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Mi Portfolio</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link 
              href="/admin"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Admin
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 