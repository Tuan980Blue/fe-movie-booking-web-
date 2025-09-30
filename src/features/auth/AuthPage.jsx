import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PopcornAnimation from '../../components/animations/EnhancedPopcornAnimation';
import {COLORS} from "../../shared/constants/colors";

const AuthPage = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register'
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    const result = await login(userData);
    if (result.success) {
      navigate('/');
    } else {
      alert(`Đăng nhập thất bại: ${result.error}`);
    }
  };

  const handleRegister = async (userData) => {
    const result = await register(userData);
    if (result.success) {
      navigate('/');
    } else {
      alert(`Đăng ký thất bại: ${result.error}`);
    }
  };

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div className="relative h-screen">
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `${COLORS.PRIMARY.BLACK}60` }}
      />
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 text-neutral-white opacity-20 text-6xl">
        🎬
      </div>
      <div className="absolute top-20 right-20 text-neutral-white opacity-20 text-4xl">
        🍿
      </div>
      <div className="absolute bottom-20 left-20 text-neutral-white opacity-20 text-5xl">
        ⭐
      </div>
      <div className="absolute bottom-10 right-10 text-neutral-white opacity-20 text-6xl">
        🎟️
      </div>
      {/* Popcorn Falling Animation */}
      <PopcornAnimation />

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
