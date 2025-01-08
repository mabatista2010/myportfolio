import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import ImageUpload from '@/components/ImageUpload'
import Toast from '@/components/Toast'
import { supabase } from '@/lib/supabaseClient'

interface AppForm {
  title: string
  description: string
  app_url: string
  image_url: string
}

export default function NewApp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, type: 'success', message: '' })
  const [formData, setFormData] = useState<AppForm>({
    title: '',
    description: '',
    app_url: '',
    image_url: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('apps')
        .insert([formData])
        .select()

      if (error) throw error

      setToast({
        show: true,
        type: 'success',
        message: 'Aplicación creada exitosamente'
      })

      setTimeout(() => {
        router.push('/admin')
      }, 2000)
    } catch (error: any) {
      console.error('Error:', error)
      setToast({
        show: true,
        type: 'error',
        message: error.message || 'Error al crear la aplicación'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8"
      >
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-white mb-6">Nueva Aplicación</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Título
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md bg-dark-700 border-gray-600 text-gray-100 placeholder-gray-400
                         focus:border-neon-blue focus:ring-neon-blue/50 shadow-sm"
                placeholder="Nombre de tu aplicación"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                Descripción
              </label>
              <textarea
                id="description"
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md bg-dark-700 border-gray-600 text-gray-100 placeholder-gray-400
                         focus:border-neon-blue focus:ring-neon-blue/50 shadow-sm"
                placeholder="Describe tu aplicación"
              />
            </div>

            <div>
              <label htmlFor="app_url" className="block text-sm font-medium text-gray-300">
                URL de la Aplicación
              </label>
              <input
                type="url"
                id="app_url"
                required
                value={formData.app_url}
                onChange={(e) => setFormData({ ...formData, app_url: e.target.value })}
                className="mt-1 block w-full rounded-md bg-dark-700 border-gray-600 text-gray-100 placeholder-gray-400
                         focus:border-neon-blue focus:ring-neon-blue/50 shadow-sm"
                placeholder="https://tu-aplicacion.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Imagen de la Aplicación
              </label>
              <ImageUpload
                onUpload={(url) => setFormData({ ...formData, image_url: url })}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => router.back()}
                className="inline-flex justify-center rounded-md border border-gray-600 px-4 py-2 text-sm font-medium 
                         text-gray-300 bg-dark-800 hover:bg-dark-700 focus:outline-none focus:ring-2 
                         focus:ring-neon-blue/50 focus:ring-offset-2 focus:ring-offset-dark-900"
              >
                Cancelar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-neon-blue/20 px-4 py-2 
                         text-sm font-medium text-neon-blue hover:bg-neon-blue/30 focus:outline-none focus:ring-2 
                         focus:ring-neon-blue/50 focus:ring-offset-2 focus:ring-offset-dark-900"
              >
                {loading ? 'Guardando...' : 'Crear Aplicación'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      <Toast
        show={toast.show}
        type={toast.type as 'success' | 'error'}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </Layout>
  )
} 