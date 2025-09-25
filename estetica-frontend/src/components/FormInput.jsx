import React from 'react';

export default function FormInput({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  icon, 
  name,
  required = false 
}) {
  const inputClass = `
    w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-200 focus:outline-none text-gray-900 placeholder-gray-400
    ${error 
      ? 'border-red-300 focus:border-red-500 bg-red-50' 
      : 'border-pink-200 focus:border-pink-500 bg-white/90'
    }
  `;

  return (
    <div className="space-y-2">
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClass}
          required={required}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}