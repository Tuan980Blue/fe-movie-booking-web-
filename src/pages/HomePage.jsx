import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-neutral-white">
          <h1 className="text-4xl font-bold mb-4">🎬 Cinema Booking System</h1>
          <p className="text-xl opacity-90 mb-8">Trang chủ đang được phát triển...</p>
          <div className="text-sm opacity-75">
            <p>Navbar đã sẵn sàng với thiết kế chuyên nghiệp</p>
            <p>Truy cập <code className="bg-neutral-white text-primary-purple px-2 py-1 rounded">/auth</code> để đăng nhập</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
