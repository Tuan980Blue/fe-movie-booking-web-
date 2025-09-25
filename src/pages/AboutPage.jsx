import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-white mb-4">
            ℹ️ Giới thiệu
          </h1>
          <p className="text-neutral-white opacity-75 text-lg">
            Thông tin về TA MEM CINEMA
          </p>
        </div>
        
        <div className="bg-neutral-white rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">ℹ️</div>
          <h2 className="text-2xl font-bold text-neutral-darkGray mb-4">
            AboutPage đang được phát triển
          </h2>
          <p className="text-neutral-lightGray">
            Trang này sẽ hiển thị thông tin về rạp chiếu phim
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
