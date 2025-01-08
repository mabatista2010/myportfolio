import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabaseClient'

interface ImageUploadProps {
  onUpload: (url: string) => void
  currentImage?: string
}

export default function ImageUpload({ onUpload, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage)

  const uploadImage = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen para subir.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from('images').getPublicUrl(filePath)
      
      setPreview(data.publicUrl)
      onUpload(data.publicUrl)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setUploading(false)
    }
  }, [onUpload])

  return (
    <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
      <div className="text-center">
        {preview ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-32 w-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setPreview(undefined)
                onUpload('')
              }}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
        )}
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
          >
            <span>{uploading ? 'Subiendo...' : 'Sube una imagen'}</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={uploadImage}
              disabled={uploading}
            />
          </label>
        </div>
      </div>
    </div>
  )
} 