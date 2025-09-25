// Updated theme with registration form styles
export const theme = {
  colors: {
    primary: {
      50: '#fdf2f8',
      100: '#fce7f3', 
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899', // Main pink
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843'
    },
    rose: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3', 
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e', // Rose accent
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    },
    gold: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d', 
      400: '#fbbf24',
      500: '#f59e0b', // Gold accent
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717'
    }
  },
  gradients: {
    primary: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    soft: 'linear-gradient(135deg, #fdf2f8 0%, #fff1f2 100%)',
    gold: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
  },
  shadows: {
    soft: '0 4px 6px -1px rgba(236, 72, 153, 0.1), 0 2px 4px -1px rgba(236, 72, 153, 0.06)',
    medium: '0 10px 15px -3px rgba(236, 72, 153, 0.1), 0 4px 6px -2px rgba(236, 72, 153, 0.05)',
    large: '0 20px 25px -5px rgba(236, 72, 153, 0.1), 0 10px 10px -5px rgba(236, 72, 153, 0.04)'
  },
  borderRadius: {
    sm: '4px',
    md: '8px', 
    lg: '12px',
    xl: '16px',
    '2xl': '24px'
  },
  forms: {
    input: {
      base: 'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none',
      default: 'border-pink-200 focus:border-pink-500 bg-white/80',
      error: 'border-red-300 focus:border-red-500 bg-red-50',
      success: 'border-green-300 focus:border-green-500 bg-green-50'
    },
    button: {
      primary: 'w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl',
      secondary: 'w-full bg-white border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-semibold py-4 px-6 rounded-xl transition-all duration-200'
    }
  }
};