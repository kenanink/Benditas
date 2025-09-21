import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Panel Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/products" className="p-4 bg-white rounded shadow">Gestionar Productos</Link>
        <Link to="/admin/services" className="p-4 bg-white rounded shadow">Gestionar Servicios</Link>
        <Link to="/admin/appointments" className="p-4 bg-white rounded shadow">Gestionar Citas</Link>
      </div>
    </div>
  );
}
