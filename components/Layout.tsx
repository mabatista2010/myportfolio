import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    setIsLoggedIn(!!session)
  }

  async function handleSignOut() {
    try {
      await supabase.auth.signOut()
      setIsLoggedIn(false)
      router.push('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Animated background that persists across all pages */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[url('/cyber-grid.svg')] bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/0 via-dark-900 to-dark-900" />
        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-neon-blue/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-neon-pink/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Futuristic Navbar */}
      <nav className="relative z-10 border-b border-gray-800 bg-dark-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <motion.span 
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
                  whileHover={{ scale: 1.05 }}
                >
                  Mi Portfolio
                </motion.span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/admin"
                    className="text-gray-300 hover:text-neon-blue transition-colors"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-neon-pink transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/admin/login"
                  className="text-gray-300 hover:text-neon-blue transition-colors"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Futuristic Footer */}
      <footer className="relative z-10 border-t border-gray-800 bg-dark-800/50 backdrop-blur-xl mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              © {new Date().getFullYear()} Mi Portfolio. Construido con tecnologías del futuro.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 