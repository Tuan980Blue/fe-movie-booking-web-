import React from 'react';

const MyBookingsPage = () => {
  return (
    <div className="min-h-screen py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-white mb-4">
            🎫 Vé đã đặt
          </h1>
          <p className="text-neutral-white opacity-75 text-lg">
            Lịch sử đặt vé của bạn
          </p>
        </div>
        
        <div className="bg-neutral-white rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">🎫</div>
          <h2 className="text-2xl font-bold text-neutral-darkGray mb-4">
            MyBookingsPage đang được phát triển
          </h2>
          <p className="text-neutral-lightGray">
            Trang này sẽ hiển thị lịch sử đặt vé
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;
