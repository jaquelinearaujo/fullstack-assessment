import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/login-register.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setError('');
      setLoading(true);

      const result = await register(username, email, password);

      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Failed to register');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2 className="register-form-title">Register</h2>

        {error && <div className="register-form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-group">
            <label htmlFor="username" className="register-form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-form-input"
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="email" className="register-form-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="password" className="register-form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-form-input"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="confirmPassword" className="register-form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="register-form-input"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="register-form-button" 
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="register-form-footer">
          Already have an account? <Link to="/login" className="register-form-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
