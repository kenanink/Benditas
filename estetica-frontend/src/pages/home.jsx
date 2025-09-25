import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useAuth } from "../context/authcontext";
import VideoBackground from "../components/VideoBackground";
import ProductCard from "../components/ProductCard";
import AdminForm from "../components/AdminForm";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const load = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => { 
    load(); 
  }, []);

  const create = async (formData) => {
    try {
      await api.post("/products", { 
        ...formData, 
        price: parseFloat(formData.price) 
      });
      load();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      load();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <VideoBackground>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            <h1>
                Tatiana peña
            </h1>
            <p>
                Estetica - Pestañas - Cejas - Micropigmentacion
            </p>
        </div>
        
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Nuestros Productos
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Descubre nuestra colección premium de productos para el cuidado y embellecimiento de pestañas
            </p>
          </div>

          {/* Admin Form */}
          {isAdmin && (
            <div className="max-w-2xl mx-auto mb-12">
              <AdminForm type="product" onSubmit={create} />
            </div>
          )}
          
        </div>
      </div>
    </VideoBackground>
  );
}