import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productApi from '../../services/productApi';
import './product-form.scss';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stockQuantity: ''
  });

  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productApi.getProductById(id);
      const product = response.data;

      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        imageUrl: product.imageUrl || '',
        stockQuantity: product.stockQuantity !== null ? product.stockQuantity : ''
      });

      setError('');
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name) {
      setError('Product name is required');
      return false;
    }

    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      setError('Price must be a positive number');
      return false;
    }

    if (formData.stockQuantity && (isNaN(formData.stockQuantity) || Number(formData.stockQuantity) < 0)) {
      setError('Stock quantity must be a non-negative number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setError('');
      setSubmitting(true);

      const productData = {
        ...formData,
        price: Number(formData.price),
        stockQuantity: formData.stockQuantity ? Number(formData.stockQuantity) : null
      };

      if (isEditMode) {
        await productApi.updateProduct(id, productData);
      } else {
        await productApi.createProduct(productData);
      }

      navigate('/products');
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="product-form-loading">Loading product data...</div>;
  }

  return (
    <div className="product-form-container">
      <h1 className="product-form-title">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>

      {error && <div className="product-form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="product-form-content">
        <div className="product-form-group">
          <label htmlFor="name" className="product-form-label">
            Product Name <span className="product-form-required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="product-form-input"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="product-form-group">
          <label htmlFor="description" className="product-form-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="product-form-textarea"
            placeholder="Enter product description"
            rows="4"
          />
        </div>

        <div className="product-form-row">
          <div className="product-form-group">
            <label htmlFor="price" className="product-form-label">
              Price <span className="product-form-required">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="product-form-input"
              placeholder="Enter price"
              step="0.01"
              min="0.01"
              required
            />
          </div>

          <div className="product-form-group">
            <label htmlFor="stockQuantity" className="product-form-label">Stock Quantity</label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              className="product-form-input"
              placeholder="Enter stock quantity"
              min="0"
            />
          </div>
        </div>

        <div className="product-form-group">
          <label htmlFor="category" className="product-form-label">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="product-form-select"
          >
            <option value="">Select a category</option>
            <option value="ELECTRONICS">Electronics</option>
            <option value="CLOTHING">Clothing</option>
            <option value="BOOKS">Books</option>
            <option value="HOME">Home</option>
          </select>
        </div>

        <div className="product-form-group">
          <label htmlFor="imageUrl" className="product-form-label">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="product-form-input"
            placeholder="Enter image URL"
          />
        </div>

        <div className="product-form-buttons">
          <Link to="/products" className="product-form-cancel">
            Cancel
          </Link>
          <button 
            type="submit" 
            className="product-form-submit" 
            disabled={submitting}
          >
            {submitting ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
