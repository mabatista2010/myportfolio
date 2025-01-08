import React from 'react'
import Image from 'next/image'
import { App } from '@/types'

interface AppCardProps {
  app: App
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={app.image_url || '/placeholder.png'}
          alt={app.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{app.title}</h3>
        <p className="mt-1 text-gray-600 line-clamp-2">{app.description}</p>
        <a
          href={app.app_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Ver Aplicación
        </a>
      </div>
    </div>
  )
} 