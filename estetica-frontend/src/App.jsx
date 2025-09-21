import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ProductsPage from "./pages/ProductsPage";
import ServicesPage from "./pages/ServicesPage";
import AppointmentsAdmin from "./pages/AppointmentsAdmin";
import MyAppointments from "./pages/MyAppointments";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <div>
      <Navbar />
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
    </div>
  );
}
