import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Shop';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}
