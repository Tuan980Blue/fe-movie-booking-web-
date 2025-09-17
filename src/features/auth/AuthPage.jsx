import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const AuthPage = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register'

  const handleLogin = (userData) => {
    // Simple login - just show success message
    alert(`Đăng nhập thành công!\nXin chào ${userData.name}!`);
  };

  const handleRegister = (userData) => {
    // Simple register - just show success message
    alert(`Đăng ký thành công!\nChào mừng ${userData.name} đến với Cinema Booking System!`);
  };

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {currentView === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <LoginForm 
              onLogin={handleLogin}
              onSwitchToRegister={switchToRegister}
            />
          </motion.div>
        )}

        {currentView === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <RegisterForm 
              onRegister={handleRegister}
              onSwitchToLogin={switchToLogin}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
