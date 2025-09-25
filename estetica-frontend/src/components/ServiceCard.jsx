import React, { useState } from 'react';
import { formatPrice, formatDuration } from '../utils/formatters';

export default function ServiceCard({ service, onDelete, isAdmin = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Service Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={service.image}
          alt={`${service.name} - Jabari Timothy on Unsplash`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Popular Badge */}
        {service.popular && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Popular
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-rose-500 text-white rounded-full text-xs font-medium">
          {service.category}
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4 text-white transform transition-transform duration-300">
            <p className="text-sm leading-relaxed mb-3">
              {service.description}
            </p>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {formatDuration(service.duration_minutes)}
              </div>
            </div>
            <button className="w-full bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Reservar Ahora
            </button>
          </div>
        </div>
      </div>

      {/* Service Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
          {service.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-rose-600">
            {formatPrice(service.price)}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {formatDuration(service.duration_minutes)}
          </div>
        </div>
        
        {isAdmin && (
          <button 
            onClick={() => onDelete(service.id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}