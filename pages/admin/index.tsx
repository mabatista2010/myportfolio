import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { supabase, initStorage } from '@/lib/supabaseClient'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'

interface App {
  id: string
  title: string
  description: string
  image_url: string
  app_url: string
}

export default function Admin() {
  const router = useRouter()
  const [apps, setApps] = useState<App[]>([])
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; appId: string | null }>({
    isOpen: false,
    appId: null,
  })

  useEffect(() => {
    checkUser()
    fetchApps()
  }, [])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin/login')
    } else {
      await initStorage()
    }
  }

  async function fetchApps() {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching apps:', error)
    } else {
      setApps(data || [])
    }
  }

  async function deleteApp(id: string) {
    const { error } = await supabase
      .from('apps')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting app:', error)
    } else {
      fetchApps()
      setDeleteModal({ isOpen: false, appId: null })
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-6 sm:px-0"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Aplicaciones</h1>
            <Link
              href="/admin/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nueva Aplicación
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {app.image_url && (
                  <img
                    src={app.image_url}
                    alt={app.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{app.title}</h3>
                  <p className="text-gray-600 mb-4">{app.description}</p>
                  <div className="flex justify-end space-x-3">
                    <Link
                      href={`/admin/edit/${app.id}`}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Editar
                    </Link>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, appId: app.id })}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, appId: null })}
        title="Confirmar eliminación"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            ¿Estás seguro de que quieres eliminar esta aplicación? Esta acción no se puede deshacer.
          </p>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={() => deleteModal.appId && deleteApp(deleteModal.appId)}
          >
            Eliminar
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setDeleteModal({ isOpen: false, appId: null })}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </Layout>
  )
} 