import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../../shared/constants/colors';
import PopcornAnimation from '../../../components/animations/EnhancedPopcornAnimation';

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
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

    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (!formData.agreeTerms) {
      alert('Vui lòng đồng ý với điều khoản sử dụng!');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onRegister({
        name: formData.name,
        email: formData.email,
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
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Ticket Card Container */}
        <div className="bg-neutral-white rounded-2xl shadow-2xl overflow-hidden relative border-2 border-neutral-lightGray border-dashed">
          {/* Ticket Notch - Left */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-primary-purple rounded-r-full -ml-2" />

          {/* Ticket Notch - Right */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-primary-purple rounded-l-full -mr-2" />

          {/* Ticket Header */}
          <div
            className="p-6 text-center relative"
            style={{ background: COLORS.GRADIENTS.PINK_ORANGE }}
          >
            <div className="text-4xl mb-2">🎫</div>
            <h1 className="text-neutral-white text-2xl font-bold">
              🎬 Đăng ký tài khoản
            </h1>
            <p className="text-neutral-white opacity-90 text-sm mt-2">
              Tham gia Cinema Booking System
            </p>
            <div className="mt-3 text-neutral-white opacity-75 text-xs">
              <div>🎫 TICKET REGISTRATION</div>
              <div>📅 Valid: Lifetime</div>
            </div>
          </div>

          {/* Ticket Body - Horizontal Layout */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 relative">
                {/* Vertical Divider Line */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-lightGray border-dashed border-l-2 border-neutral-lightGray transform -translate-x-1/2"></div>

                {/* Left Column */}
                <div className="space-y-4 pr-0 lg:pr-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-neutral-darkGray text-sm font-semibold mb-2">
                      👤 Họ và tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-lightGray rounded-xl focus:border-primary-pink focus:outline-none transition-colors"
                      placeholder="Nhập họ và tên"
                    />
                  </div>

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
                </div>

                {/* Right Column */}
                <div className="space-y-4 pl-0 lg:pl-6">
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

                  {/* Confirm Password Input */}
                  <div>
                    <label className="block text-neutral-darkGray text-sm font-semibold mb-2">
                      🔒 Xác nhận mật khẩu
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-lightGray rounded-xl focus:border-primary-pink focus:outline-none transition-colors"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Agreement - Full Width */}
              <div className="flex items-start mb-6">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="mr-2 mt-1 text-primary-pink focus:ring-primary-pink"
                />
                <span className="text-neutral-darkGray text-sm">
                  Tôi đồng ý với{' '}
                  <button type="button" className="text-accent-orange hover:text-accent-yellow">
                    điều khoản sử dụng
                  </button>
                  {' '}và{' '}
                  <button type="button" className="text-accent-orange hover:text-accent-yellow">
                    chính sách bảo mật
                  </button>
                </span>
              </div>

              {/* Register Button - Full Width */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-bold text-neutral-white transition-all duration-300 relative overflow-hidden mb-6"
                style={{
                  backgroundColor: COLORS.ACCENT.ORANGE,
                  background: isLoading
                    ? `linear-gradient(135deg, ${COLORS.ACCENT.ORANGE} 0%, ${COLORS.ACCENT.YELLOW} 100%)`
                    : COLORS.ACCENT.ORANGE
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `linear-gradient(135deg, ${COLORS.ACCENT.ORANGE} 0%, ${COLORS.PRIMARY.PINK} 100%)`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = COLORS.ACCENT.ORANGE;
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neutral-white mr-2"></div>
                    Đang đăng ký...
                  </div>
                ) : (
                  '🎫 Tạo tài khoản'
                )}
              </motion.button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-neutral-lightGray border-dashed"></div>
                <span className="px-4 text-neutral-lightGray text-sm">hoặc</span>
                <div className="flex-1 border-t border-neutral-lightGray border-dashed"></div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-neutral-darkGray text-sm">Đã có tài khoản? </span>
                <button
                  onClick={onSwitchToLogin}
                  className="text-primary-pink font-semibold hover:text-cinema-neonPink transition-colors"
                >
                  Đăng nhập ngay
                </button>
              </div>
            </form>
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
                  🎭
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xl"
                >
                  🎪
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-lg"
                >
                  🎨
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
