import React, { useState } from 'react';
import { formatPrice } from '../utils/formatters';

export default function ProductCard({ product, onDelete, isAdmin = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image}
          alt={`${product.name} - Mockup Free on Unsplash`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Stock Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
          product.inStock 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {product.inStock ? 'En Stock' : 'Agotado'}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-pink-500 text-white rounded-full text-xs font-medium">
          {product.category}
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4 text-white transform transition-transform duration-300">
            <p className="text-sm leading-relaxed">
              {product.description}
            </p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.35 2.65c-.14.15-.25.33-.25.53 0 .28.22.5.5.5H19M7 13v4a2 2 0 002 2h2m5-6v4a2 2 0 002 2h2m-6-4h2"/>
                  </svg>
                  Añadir
                </div>
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-pink-600">
            {formatPrice(product.price)}
          </span>
          
          {isAdmin && (
            <button 
              onClick={() => onDelete(product.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}