import React from 'react';
import {motion} from "framer-motion";
import {Link} from "react-router-dom";

const BookingForm = () => {
  return (
    <div className={""}>
      {/* Booking Form */}
      <motion.div
        className="bg-white sticky top-6 rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-center gap-3">
          <div className="ml-4 h-px bg-primary-pink flex-1"></div>
          <span className="text-xl">🎫</span>
          <h3 className="text-primary-pink font-bold text-lg">ĐẶT VÉ</h3>
          <div className="mr-4 h-px bg-primary-pink flex-1"></div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          {/* Movie Selection */}
          <div className="relative">
            <label className="block text-sm font-semibold text-neutral-darkGray mb-2">
              🎬 Chọn Phim
            </label>
            <select className="w-full px-4 py-3 border-2 border-neutral-lightGray rounded-lg focus:border-primary-pink focus:outline-none transition-colors">
              <option>Title</option>
            </select>
            <svg className="absolute right-3 top-9 w-5 h-5 text-neutral-lightGray" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Date Selection */}
          <div className="relative">
            <label className="block text-sm font-semibold text-neutral-darkGray mb-2">
              📅 Chọn Ngày
            </label>
            <select className="w-full px-4 py-3 border-2 border-neutral-lightGray rounded-lg focus:border-primary-pink focus:outline-none transition-colors">
              <option>Hôm nay ({new Date().getDate()}/{new Date().getMonth() + 1})</option>
              <option>Ngày mai ({new Date().getDate() + 1}/{new Date().getMonth() + 1})</option>
            </select>
            <svg className="absolute right-3 top-9 w-5 h-5 text-neutral-lightGray" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Showtime Selection */}
          <div className="relative">
            <label className="block text-sm font-semibold text-neutral-darkGray mb-2">
              🕐 Chọn Suất
            </label>
            <select className="w-full px-4 py-3 border-2 border-neutral-lightGray rounded-lg focus:border-primary-pink focus:outline-none transition-colors">
              <option>Chọn suất chiếu</option>
              <option>18:00</option>
              <option>20:10</option>
              <option>21:10</option>
              <option>22:20</option>
            </select>
            <svg className="absolute right-3 top-9 w-5 h-5 text-neutral-lightGray" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {/* CTA Button */}
          <Link
            to={``}
            className="block w-full bg-primary-pink text-white py-4 rounded-xl font-bold text-center hover:bg-cinema-neonPink transition-colors shadow-lg"
          >
            🎫 MUA VÉ
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingForm;
