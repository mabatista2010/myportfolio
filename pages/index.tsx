import { GetServerSideProps } from 'next'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import { supabase } from '@/lib/supabaseClient'

interface App {
  id: string
  title: string
  description: string
  image_url: string
  app_url: string
  created_at: string
  updated_at: string
}

interface HomeProps {
  apps: App[]
}

export default function Home({ apps }: HomeProps) {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-dark-900 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/cyber-grid.svg')] bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/0 via-dark-900 to-dark-900" />
          {/* Glowing orbs con menos brillo */}
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-neon-blue/10 rounded-full filter blur-3xl animate-float" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-neon-pink/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '-4s' }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
                Innovación Digital
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Desarrollando aplicaciones del futuro con Inteligencia Artificial, donde la creatividad supera las barreras del código
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator mejorado */}
        <motion.div 
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center w-full px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-gray-400 mb-4 text-sm uppercase tracking-wider whitespace-nowrap">
            Descubre mis proyectos
          </span>
          <motion.div
            animate={{ 
              y: [0, 8, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center"
          >
            <svg 
              className="w-6 h-6 text-neon-blue" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <div className="h-12 w-0.5 bg-gradient-to-b from-neon-blue to-transparent mt-1" />
          </motion.div>
        </motion.div>
      </div>

      {/* Projects Section */}
      <div className="bg-dark-900 py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative mb-16"
          >
            <h2 className="text-4xl font-bold text-center">
              <span className="relative inline-block">
                {/* Línea decorativa superior */}
                <div className="absolute -top-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
                
                {/* Texto con gradiente */}
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-white to-neon-purple">
                  Proyectos Destacados
                </span>
                
                {/* Línea decorativa inferior */}
                <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />
                
                {/* Efecto de brillo sutil en las esquinas */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-blue opacity-50 blur-sm" />
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-purple opacity-50 blur-sm" />
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card background with glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl group-hover:duration-200" />
                
                <div className="relative bg-dark-800 rounded-xl overflow-hidden">
                  {app.image_url ? (
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={app.image_url}
                        alt={app.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/50 to-transparent" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5" />
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-blue transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-gray-400 mb-4 truncate">
                      {app.description}
                    </p>
                    <motion.a
                      href={app.app_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-neon-blue hover:text-neon-purple transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      Explorar
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const { data: apps, error } = await supabase
    .from('apps')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching apps:', error)
    return { props: { apps: [] } }
  }

  return { props: { apps: apps || [] } }
} 