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

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={remove}
                isAdmin={isAdmin}
              />
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
                <svg className="w-16 h-16 text-pink-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No hay productos disponibles
                </h3>
                <p className="text-gray-600">
                  {isAdmin ? "Agrega el primer producto usando el formulario de arriba." : "Pronto tendremos productos disponibles."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </VideoBackground>
  );
}