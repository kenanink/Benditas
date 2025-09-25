import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Login from './pages/login';
import RegisterPage from './pages/registerPage';
import ProductsPage from './pages/productsPage';
import ServicesPage from './pages/servicesPage';

// Mock auth context for preview
const MockAuthProvider = ({ children }) => {
  const mockAuthValue = {
    user: null, // Start with no user for registration demo
    login: (token) => console.log('Login with token:', token),
    logout: () => console.log('Logout clicked')
  };

  return (
    <div>
      {React.cloneElement(children, { useAuth: () => mockAuthValue })}
    </div>
  );
};

export default function BeautyPreview() {
  return (
    <BrowserRouter>
      <MockAuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/register" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/signin" element={<RegisterPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/services" element={<ServicesPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </MockAuthProvider>
    </BrowserRouter>
  );
}