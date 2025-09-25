import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('access_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAdmin(parsedUser.role === 'admin');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (userData) => {
    try {
      // Simulate API call
      const mockUser = {
        id: userData.id || Math.random().toString(36).substr(2, 9),
        name: userData.name || userData.email.split('@')[0],
        email: userData.email,
        role: userData.role || 'user',
        avatar: userData.avatar || null,
        createdAt: new Date().toISOString()
      };

      const mockToken = `mock_token_${Date.now()}`;

      // Store in localStorage
      localStorage.setItem('access_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAdmin(mockUser.role === 'admin');

      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: 'user',
        avatar: null,
        createdAt: new Date().toISOString()
      };

      const mockToken = `mock_token_${Date.now()}`;

      // Store in localStorage
      localStorage.setItem('access_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAdmin(false);

      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setIsAdmin(false);
  };

  const updateProfile = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
