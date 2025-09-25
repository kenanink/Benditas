import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function ActionButtons({ isMobile = false }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate("/login");
  };

  const buttonClass = `
    px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
    ${isMobile ? 'w-full justify-center' : ''}
  `;

  const primaryButtonClass = `
    ${buttonClass}
    bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md
  `;

  const secondaryButtonClass = `
    ${buttonClass}
    bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200
  `;

  if (!user) {
    return (
      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center space-x-3'}`}>
        <Link to="/login" className={secondaryButtonClass}>
          Iniciar Sesión
        </Link>
        <Link to="/signin" className={primaryButtonClass}>
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center space-x-3'}`}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
          <span className="text-orange-600 text-sm font-medium">
            {user.email.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-sm text-gray-700 hidden lg:block">
          Hola, {user.email.split('@')[0]}
        </span>
      </div>
      <button 
        onClick={doLogout} 
        className={`${secondaryButtonClass} hover:bg-red-50 hover:text-red-600 hover:border-red-200`}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}