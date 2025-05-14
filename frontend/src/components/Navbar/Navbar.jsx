import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './navbar.scss';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo-link">Product Catalog</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/products" className="navbar-link">Products</Link>

        {isAuthenticated ? (
          <>
            <span className="navbar-user-info">Welcome, {user.username}</span>
            <button onClick={handleLogout} className="navbar-auth-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-auth-link">Login</Link>
            <Link to="/register" className="navbar-auth-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;