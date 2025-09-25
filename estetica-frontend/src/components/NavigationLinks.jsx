import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function NavigationLinks({ isMobile = false, onLinkClick }) {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) => `
    relative px-4 py-2 text-sm font-medium transition-all duration-200
    ${isMobile 
      ? 'block w-full text-left hover:bg-gray-50' 
      : 'hover:text-gray-600'
    }
    ${isActive(path) 
      ? 'text-orange-500' 
      : 'text-gray-700'
    }
  `;

  const links = [
    { path: "/products", label: "Productos" },
    { path: "/services", label: "Servicios" },
  ];

  // Add conditional links based on user role
  if (user?.role === "admin") {
    links.push({ path: "/admin", label: "Admin" });
  } else if (user && user.role !== "admin") {
    links.push({ path: "/my-appointments", label: "Mis Citas" });
  }

  return (
    <div className={isMobile ? "flex flex-col space-y-2" : "hidden md:flex items-center space-x-1"}>
      {links.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={linkClass(path)}
          onClick={onLinkClick}
        >
          {label}
          {!isMobile && isActive(path) && (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></span>
          )}
        </Link>
      ))}
    </div>
  );
}