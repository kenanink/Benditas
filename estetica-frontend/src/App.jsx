import './App.css'
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/login.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import ClientDashboard from "./pages/clientDashboard.jsx";
import ProductsPage from "./pages/productsPage.jsx";
import ServicesPage from "./pages/servicesPage.jsx";
import AppointmentsAdmin from "./pages/appointmentsAdmin.jsx";
import MyAppointments from "./pages/myAppointments.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import AdminRoute from "./components/adminRoute.jsx";
import VideoBackground from './components/VideoBackground.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto mt-6">
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />

            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/products" element={
              <AdminRoute><ProductsPage/></AdminRoute>
            } />
            <Route path="/admin/services" element={
              <AdminRoute><ServicesPage/></AdminRoute>
            } />
            <Route path="/admin/appointments" element={
              <AdminRoute><AppointmentsAdmin/></AdminRoute>
            } />

            <Route path="/my-appointments" element={
              <ProtectedRoute><MyAppointments/></ProtectedRoute>
            } />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}