import React, { createContext, useState, useContext, useEffect } from 'react';
import authApi from '../services/authApi';
import { getStoredUser, storeUser, removeStoredUser } from '../utils/authUtils';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (data) => {
    const userData = { username: data.username, email: data.email };
    setUser(userData);
    storeUser(userData);
    return { success: true };
  };

  const validateUser = (response) => {
    if (response.data.success) {
      return handleAuthSuccess(response.data);
    } else {
      setError(response.data.message);
      return { success: false, message: response.data.message };
    }
  };

  const register = async (username, email, password) => {
    try {
      setError(null);
      const response = await authApi.register({ username, email, password });
      return validateUser(response);
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  };

  const login = async (username, password) => {
    try {
      setError(null);
      const response = await authApi.login({ username, password });
      return validateUser(response);
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    }
  };

  const logout = (message = null) => {
    setUser(null);
    removeStoredUser();
    if (message) setError(message);
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
