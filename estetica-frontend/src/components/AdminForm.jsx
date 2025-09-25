import React, { useState } from 'react';

export default function AdminForm({ type, onSubmit }) {
  const [form, setForm] = useState(
    type === 'product' 
      ? { name: "", description: "", price: "" }
      : { name: "", description: "", price: "", duration_minutes: 60 }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "El nombre es requerido";
    if (!form.description.trim()) newErrors.description = "La descripción es requerida";
    if (!form.price || parseFloat(form.price) <= 0) newErrors.price = "El precio debe ser mayor a 0";
    if (type === 'service' && (!form.duration_minutes || form.duration_minutes <= 0)) {
      newErrors.duration_minutes = "La duración debe ser mayor a 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(form);
      setForm(
        type === 'product' 
          ? { name: "", description: "", price: "" }
          : { name: "", description: "", price: "", duration_minutes: 60 }
      );
      setErrors({});
    }
  };

  const inputClass = (fieldName) => `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none
    ${errors[fieldName] 
      ? 'border-red-300 focus:border-red-500 bg-red-50' 
      : 'border-pink-200 focus:border-pink-500 bg-white/80'
    }
  `;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Agregar {type === 'product' ? 'Producto' : 'Servicio'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            placeholder="Nombre"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            className={inputClass('name')}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <textarea
            placeholder="Descripción"
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            className={`${inputClass('description')} h-24 resize-none`}
            rows="3"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Precio (₡)"
            value={form.price}
            onChange={e => setForm({...form, price: e.target.value})}
            className={inputClass('price')}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {type === 'service' && (
          <div>
            <input
              type="number"
              placeholder="Duración (minutos)"
              value={form.duration_minutes}
              onChange={e => setForm({...form, duration_minutes: parseInt(e.target.value) || 0})}
              className={inputClass('duration_minutes')}
            />
            {errors.duration_minutes && <p className="text-red-500 text-sm mt-1">{errors.duration_minutes}</p>}
          </div>
        )}

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Crear {type === 'product' ? 'Producto' : 'Servicio'}
        </button>
      </form>
    </div>
  );
}