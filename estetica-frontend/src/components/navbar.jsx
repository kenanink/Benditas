import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-xl">Estética</Link>
        <Link to="/products" className="text-sm">Productos</Link>
        <Link to="/services" className="text-sm">Servicios</Link>
        {user && user.role === "admin" && (
          <Link to="/admin" className="text-sm">Admin</Link>
        )}
        {user && user.role !== "admin" && (
          <Link to="/my-appointments" className="text-sm">Mis Citas</Link>
        )}
      </div>

      <div>
        {!user ? (
          <Link to="/login" className="px-3 py-1 bg-indigo-600 text-white rounded">Iniciar sesión</Link>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm">Hola, {user.email}</span>
            <button onClick={doLogout} className="px-3 py-1 bg-red-500 text-white rounded">Salir</button>
          </div>
        )}
      </div>
    </nav>
  );
}
