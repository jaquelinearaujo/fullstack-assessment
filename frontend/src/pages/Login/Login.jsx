import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/login-register.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      setError('');
      setLoading(true);

      const result = await login(username, password);

      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Failed to login');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-form-title">Login</h2>

        {error && <div className="login-form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label htmlFor="username" className="login-form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-form-input"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-form-button" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-form-footer">
          Don't have an account? <Link to="/register" className="login-form-link">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;