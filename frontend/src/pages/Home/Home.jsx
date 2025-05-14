import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './home.scss'

function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-hero-title">Welcome to the Product Catalog</h1>
        <p className="home-hero-subtitle">
          Explore our collection of products.
        </p>

        <div className="home-button-container">
          <Link to="/products" className="home-button-primary">
            Browse Products
          </Link>

          {!isAuthenticated ? (
            <Link to="/login" className="home-button-secondary">
              Sign In
            </Link>
          ) : (
            <Link to="/products/new" className="home-button-secondary">
              Add New Product
            </Link>
          )}
        </div>
      </div>

      {isAuthenticated && (
        <div className="home-welcome-back">
          <h2 className="home-welcome-title">Welcome, {user.username}!</h2>
          <p className="home-welcome-message">
            Thank you for being part of our community. You can now add, edit, and manage products.
          </p>
        </div>
      )}
    </div>
  )
}

export default Home