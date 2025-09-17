import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { COLORS } from '../shared/constants/colors';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', label: 'TRANG CHỦ', icon: '🏠' },
    { id: 'movies', label: 'PHIM', icon: '🎬' },
    { id: 'showtimes', label: 'LỊCH CHIẾU', icon: '📅' },
    { id: 'prices', label: 'GIÁ VÉ', icon: '💰' },
    { id: 'members', label: 'THÀNH VIÊN', icon: '👥' },
    { id: 'promotions', label: 'ƯU ĐÃI - SỰ KIỆN', icon: '🎉' },
    { id: 'reviews', label: 'ĐÁNH GIÁ PHIM', icon: '⭐' },
    { id: 'about', label: 'GIỚI THIỆU', icon: 'ℹ️' },
    { id: 'services', label: 'DỊCH VỤ', icon: '🛠️' }
  ];

  return (
    <nav className="relative overflow-hidden shadow-lg">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-pink to-accent-orange opacity-20"></div>
        <div className="absolute top-4 left-4 w-2 h-2 bg-neutral-white rounded-full"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-accent-yellow rounded-full"></div>
        <div className="absolute bottom-4 left-1/4 w-1.5 h-1.5 bg-cinema-neonBlue rounded-full"></div>
        <div className="absolute bottom-8 right-1/3 w-1 h-1 bg-cinema-neonPink rounded-full"></div>
      </div>

      {/* Top Header Section */}
      <div className="relative z-10 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-4">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: `linear-gradient(135deg, ${COLORS.ACCENT.ORANGE} 0%, ${COLORS.PRIMARY.PINK} 100%)` }}
              >
                <span className="text-neutral-white text-xl">▶️</span>
              </div>
              <div>
                <div className="text-primary-pink font-bold text-lg">TA MEM</div>
                <div className="text-primary-purple font-semibold text-sm -mt-1">CINEMA</div>
              </div>
            </motion.div>

            {/* Book Tickets Banner */}
            <motion.div
              className="hidden lg:flex items-center bg-accent-yellow px-4 py-2 rounded-lg border-2 border-accent-orange shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🎥</span>
                <span className="text-neutral-darkGray font-bold text-sm">ĐẶT VÉ NGAY</span>
                <span className="text-xl">🍿</span>
              </div>
            </motion.div>
          </div>

          {/* Middle - Search and Language */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                className="w-64 px-4 py-2 pr-10 bg-neutral-white rounded-full text-neutral-darkGray placeholder-neutral-lightGray focus:outline-none focus:ring-2 focus:ring-primary-pink transition-all"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-pink hover:text-cinema-neonPink transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Language Selector */}
            <motion.button
              className="w-8 h-8 rounded-full bg-accent-red flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-neutral-white text-xs font-bold">VN</span>
            </motion.button>
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-3">
            {/* Register Button */}
            <Link to="/auth">
              <motion.button
                className="hidden sm:flex items-center space-x-2 bg-neutral-lightGray bg-opacity-20 border border-neutral-white px-4 py-2 rounded-full text-neutral-white hover:bg-neutral-white hover:text-primary-purple transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">🍿</span>
                <span className="font-semibold text-sm">ĐĂNG KÍ THÀNH VIÊN</span>
              </motion.button>
            </Link>

            {/* Login Button */}
            <Link to="/auth">
              <motion.button
                className="flex items-center space-x-2 bg-primary-pink px-4 py-2 rounded-full text-neutral-white hover:bg-cinema-neonPink transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">🥤</span>
                <span className="font-bold text-sm">ĐĂNG NHẬP</span>
              </motion.button>
            </Link>

            {/* Notifications */}
            <motion.button
              className="w-10 h-10 bg-primary-pink rounded-full flex items-center justify-center text-neutral-white hover:bg-cinema-neonPink transition-all shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden w-10 h-10 bg-primary-pink rounded-full flex items-center justify-center text-neutral-white"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="h-px bg-primary-pink"></div>

      {/* Main Navigation */}
      <div className="relative z-10 px-4 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 rounded-t-lg font-semibold text-sm transition-all ${
                  activeTab === item.id
                    ? 'bg-primary-pink text-neutral-white'
                    : 'text-neutral-white hover:text-accent-yellow hover:bg-neutral-white hover:bg-opacity-10'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}

                {/* Active Tab Indicator */}
                {activeTab === item.id && (
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-pink"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)'
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <motion.div
            className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="py-4 space-y-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                    activeTab === item.id
                      ? 'bg-primary-pink text-neutral-white'
                      : 'text-neutral-white hover:text-accent-yellow hover:bg-neutral-white hover:bg-opacity-10'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
