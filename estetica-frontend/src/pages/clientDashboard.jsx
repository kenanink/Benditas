import React from "react";
import { Link } from "react-router-dom";

export default function ClientDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Bienvenido</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/services" className="p-4 bg-white rounded shadow">Ver Servicios</Link>
        <Link to="/products" className="p-4 bg-white rounded shadow">Ver Productos</Link>
        <Link to="/my-appointments" className="p-4 bg-white rounded shadow">Mis Citas</Link>
      </div>
    </div>
  );
}
