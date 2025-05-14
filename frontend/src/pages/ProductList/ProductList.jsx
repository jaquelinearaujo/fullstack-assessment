import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productApi from '../../services/productApi';
import './product-list.scss';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getAllProducts();
      setProducts(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const response = await productApi.searchProducts(searchTerm);
      setProducts(response.data);
    } catch (err) {
      console.error('Error searching products:', err);
      setError('Failed to search products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    fetchProducts();
  };

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Product Catalog</h1>

      <div className="product-list-filter-container">
        <div className="product-list-filter-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="product-list-filter-search-input"
          />
          <button onClick={handleSearch} className="product-list-filter-button">
            Search
          </button>
        </div>

        <button onClick={resetFilters} className="product-list-filter-reset">
          Reset Filters
        </button>
      </div>

      {error && <div className="product-list-error">{error}</div>}
      {loading ? (
        <div className="product-list-loading">Loading products...</div>
      ) : (
        <React.Fragment>
          <div className="product-list-add-container">
            <Link to="/products/new" className="product-list-add-button">
              Add New Product
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="product-list-empty">
              No products found. Try different searching a different product or add a new product.
            </div>
          ) : (
            <div className="product-list-grid">
              {products.map((product) => (
                <div key={product.id} className="product-list-card">
                  <div className="product-list-card-image-container">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-list-card-image-img"
                      />
                    ) : (
                      <div className="product-list-card-image-placeholder">No Image</div>
                    )}
                  </div>
                  <div className="product-list-card-info">
                    <h3 className="product-list-card-name">{product.name}</h3>
                    <p className="product-list-card-category">{product.category}</p>
                    <p className="product-list-card-price">${product.price.toFixed(2)}</p>
                    <div className="product-list-card-actions">
                      <Link
                        to={`/products/${product.id}`}
                        className="product-list-card-view"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default ProductList;
