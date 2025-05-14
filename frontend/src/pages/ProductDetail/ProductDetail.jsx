import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productApi from '../../services/productApi';
import { useAuth } from '../../context/AuthContext';
import './product-detail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productApi.getProductById(id);
      setProduct(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      setLoading(true);
      await productApi.deleteProduct(id);
      navigate('/products');
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again later.');
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(false);
  };

  if (loading) {
    return <div className="product-detail-loading">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="product-detail-error">{error}</div>
        <Link to="/products" className="product-detail-back">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="product-detail-not-found">Product not found</div>
        <Link to="/products" className="product-detail-back">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-detail-image">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-detail-image-img"
            />
          ) : (
            <div className="product-detail-image-placeholder">No Image Available</div>
          )}
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>

          <div className="product-detail-meta">
            <span className="product-detail-category">{product.category}</span>
            <span className="product-detail-price">${product.price.toFixed(2)}</span>
          </div>

          {product.stockQuantity !== null && (
            <div className="product-detail-stock">
              <span className="product-detail-stock-label">In Stock:</span>
              <span className="product-detail-stock-quantity">{product.stockQuantity}</span>
            </div>
          )}

          <div className="product-detail-description">
            <h3 className="product-detail-description-title">Description</h3>
            <p className="product-detail-description-text">
              {product.description || 'No description available.'}
            </p>
          </div>

          <div className="product-detail-actions">
            <Link to="/products" className="product-detail-back">
              Back to Products
            </Link>

            {isAuthenticated && (
              <React.Fragment>
                <Link to={`/products/edit/${product.id}`} className="product-detail-edit">
                  Edit Product
                </Link>

                {deleteConfirm ? (
                  <div className="product-detail-delete-confirmation">
                    <p className="product-detail-delete-text">Are you sure you want to delete this product?</p>
                    <div className="product-detail-delete-buttons">
                      <button onClick={handleDelete} className="product-detail-delete-confirm">
                        Yes, Delete
                      </button>
                      <button onClick={cancelDelete} className="product-detail-delete-cancel">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={handleDelete} className="product-detail-delete">
                    Delete Product
                  </button>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
