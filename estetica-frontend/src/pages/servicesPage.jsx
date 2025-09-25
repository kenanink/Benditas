import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/authcontext";
import VideoBackground from "../components/VideoBackground";
import ServiceCard from "../components/ServiceCard";
import AdminForm from "../components/AdminForm";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const load = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error("Error loading services:", error);
    }
  };

  useEffect(() => { 
    load(); 
  }, []);

  const create = async (formData) => {
    try {
      await api.post("/services", { 
        ...formData, 
        price: parseFloat(formData.price) 
      });
      load();
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      load();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <VideoBackground>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Tratamientos profesionales realizados por expertas en belleza y cuidado de pestañas
            </p>
          </div>

          {/* Admin Form */}
          {isAdmin && (
            <div className="max-w-2xl mx-auto mb-12">
              <AdminForm type="service" onSubmit={create} />
            </div>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onDelete={remove}
                isAdmin={isAdmin}
              />
            ))}
          </div>

          {/* Empty State */}
          {services.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
                <svg className="w-16 h-16 text-rose-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0v6a2 2 0 002 2h4a2 2 0 002-2V7" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No hay servicios disponibles
                </h3>
                <p className="text-gray-600">
                  {isAdmin ? "Agrega el primer servicio usando el formulario de arriba." : "Pronto tendremos servicios disponibles."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </VideoBackground>
  );
}