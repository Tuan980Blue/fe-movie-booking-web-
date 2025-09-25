import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../../shared/constants/colors';
import PopcornAnimation from '@/components/animations/EnhancedPopcornAnimation';


const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        email: formData.email,
        name: formData.email.split('@')[0], // Mock user name
        id: Math.random().toString(36).substr(2, 9)
      });
    }, 1500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLORS.PRIMARY.PURPLE} 0%, ${COLORS.PRIMARY.PINK} 100%)`
      }}
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `${COLORS.PRIMARY.BLACK}60` }}
      />

      {/* Popcorn Falling Animation */}
      <PopcornAnimation />

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

      {/* Ticket Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Ticket Card Container */}
        <div className="bg-neutral-white rounded-2xl shadow-2xl overflow-hidden relative">
          {/* Ticket Notch - Left */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-primary-purple rounded-r-full -ml-2" />

          {/* Ticket Notch - Right */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-primary-purple rounded-l-full -mr-2" />

          {/* Ticket Header */}
          <div
            className="p-6 text-center relative"
            style={{ background: COLORS.GRADIENTS.PURPLE_PINK }}
          >
            <div className="text-4xl mb-2">🎟️</div>
            <h1 className="text-neutral-white text-2xl font-bold">
              🎬 Đăng nhập để đặt vé
            </h1>
            <p className="text-neutral-white opacity-90 text-sm mt-2">
              Cinema Booking System
            </p>
          </div>

          {/* Ticket Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-neutral-darkGray text-sm font-semibold mb-2">
                  📧 Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-neutral-lightGray rounded-xl focus:border-primary-pink focus:outline-none transition-colors"
                  placeholder="Nhập email của bạn"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-neutral-darkGray text-sm font-semibold mb-2">
                  🔒 Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-neutral-lightGray rounded-xl focus:border-primary-pink focus:outline-none transition-colors"
                  placeholder="Nhập mật khẩu"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="mr-2 text-primary-pink focus:ring-primary-pink"
                  />
                  <span className="text-neutral-darkGray text-sm">Ghi nhớ tôi</span>
                </label>
                <button
                  type="button"
                  className="text-accent-orange text-sm hover:text-accent-yellow transition-colors"
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-bold text-neutral-white transition-all duration-300 relative overflow-hidden"
                style={{
                  backgroundColor: COLORS.PRIMARY.PINK,
                  background: isLoading
                    ? `linear-gradient(135deg, ${COLORS.PRIMARY.PINK} 0%, ${COLORS.ACCENT.ORANGE} 100%)`
                    : COLORS.PRIMARY.PINK
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `linear-gradient(135deg, ${COLORS.PRIMARY.PINK} 0%, ${COLORS.PRIMARY.PURPLE} 100%)`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = COLORS.PRIMARY.PINK;
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neutral-white mr-2"></div>
                    Đang đăng nhập...
                  </div>
                ) : (
                  '🎫 Đăng nhập'
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-neutral-lightGray border-dashed"></div>
              <span className="px-4 text-neutral-lightGray text-sm">hoặc</span>
              <div className="flex-1 border-t border-neutral-lightGray border-dashed"></div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <span className="text-neutral-darkGray text-sm">Chưa có tài khoản? </span>
              <button
                onClick={onSwitchToRegister}
                className="text-accent-orange font-semibold hover:text-accent-yellow transition-colors"
              >
                Đăng ký ngay
              </button>
            </div>
          </div>

          {/* Ticket Right Side - QR Code & Icons */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
            <div className="text-center">
              {/* Mock QR Code */}
              <div className="w-16 h-16 bg-neutral-darkGray rounded-lg mb-2 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-sm ${
                        Math.random() > 0.5 ? 'bg-neutral-white' : 'bg-neutral-darkGray'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Movie Icons */}
              <div className="flex flex-col items-center space-y-1">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  🎥
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xl"
                >
                  🍿
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-lg"
                >
                  ⭐
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
