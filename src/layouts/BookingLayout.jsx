import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const BookingLayout = () => {
  const location = useLocation();
  const path = location.pathname || '';
  const step = path.includes('/complete') ? 3 : path.includes('/payment') ? 2 : 1;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 mb-4">
        <div className="flex items-center text-neutral-white gap-4 text-sm">
          <div className={`flex items-center gap-2 ${step === 1 ? '' : 'opacity-70'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-primary-pink text-white' : 'bg-white/40 text-neutral-darkGray'}`}>1</span>
            <span className={`${step === 1 ? 'font-semibold' : ''}`}>Chọn ghế</span>
          </div>
          <div className="flex-1 h-px bg-white/30"/>
          <div className={`flex items-center gap-2 ${step === 2 ? '' : 'opacity-70'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? 'bg-primary-pink text-white' : 'bg-white/40 text-neutral-darkGray'}`}>2</span>
            <span className={`${step === 2 ? 'font-semibold' : ''}`}>Xác thực & Thanh toán</span>
          </div>
          <div className="flex-1 h-px bg-white/30"/>
          <div className={`flex items-center gap-2 ${step === 3 ? '' : 'opacity-70'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-primary-pink text-white' : 'bg-white/40 text-neutral-darkGray'}`}>3</span>
            <span className={`${step === 3 ? 'font-semibold' : ''}`}>Hoàn tất</span>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default BookingLayout;


