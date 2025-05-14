import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProductList from './pages/ProductList/ProductList'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import ProductForm from './pages/ProductForm/ProductForm'
import Footer from "./components/Footer/Footer";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('user');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route 
              path="/products/new" 
              element={
                <ProtectedRoute>
                  <ProductForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/products/edit/:id" 
              element={
                <ProtectedRoute>
                  <ProductForm />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
       <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
