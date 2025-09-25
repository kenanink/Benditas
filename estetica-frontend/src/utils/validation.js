// Validation utilities for registration form
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const formatValidationMessage = (type, field) => {
  const messages = {
    required: `${field} es obligatorio`,
    email_format: 'Formato de correo inválido',
    password_length: 'La contraseña debe tener al menos 6 caracteres',
    password_match: 'Las contraseñas no coinciden',
    email_exists: 'El correo ya está registrado',
    name_length: 'El nombre debe tener al menos 2 caracteres'
  };
  return messages[type] || 'Error de validación';
};

export const formatSuccessMessage = (name) => {
  return `¡Bienvenido ${name}! Tu cuenta ha sido creada exitosamente.`;
};