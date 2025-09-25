import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import { validateEmail, validatePassword, validatePasswordMatch, validateName, formatValidationMessage } from '../utils/validation';
import api from '../api/api';
import { useAuth } from '../context/authcontext';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = formatValidationMessage('required', 'Nombre');
    } else if (!validateName(formData.name)) {
      newErrors.name = formatValidationMessage('name_length');
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = formatValidationMessage('required', 'Correo electrónico');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = formatValidationMessage('email_format');
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = formatValidationMessage('required', 'Contraseña');
    } else if (!validatePassword(formData.password)) {
      newErrors.password = formatValidationMessage('password_length');
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = formatValidationMessage('required', 'Confirmar contraseña');
    } else if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = formatValidationMessage('password_match');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      const { token, user } = response.data;
      
      // Auto login after successful registration
      login(token);
      
      setSuccessMessage(`¡Bienvenido ${user.name}! Tu cuenta ha sido creada exitosamente.`);
      
      // Redirect after success
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/products');
        }
      }, 2000);

    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al crear la cuenta';
      
      if (errorMessage.includes('correo') || errorMessage.includes('email')) {
        setErrors({ email: 'El correo ya está registrado' });
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-pink-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h2>
          <p className="text-gray-600">Únete a Benditas Pestañas</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <p className="text-green-700 text-sm">{successMessage}</p>
            </div>
          </div>
        )}

        {/* General Error */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <FormInput
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            }
          />

          {/* Email Input */}
          <FormInput
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            }
          />

          {/* Password Input */}
          <PasswordInput
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          {/* Confirm Password Input */}
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creando cuenta...</span>
              </>
            ) : (
              <span>Crear mi cuenta</span>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link 
              to="/login" 
              className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
            >
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}