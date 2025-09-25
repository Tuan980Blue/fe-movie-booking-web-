import React from 'react';

const AdminLayout = () => {
  return (
    <div className="min-h-screen py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-white mb-4">
            🔧 Admin Panel
          </h1>
          <p className="text-neutral-white opacity-75 text-lg">
            Khu vực quản trị hệ thống
          </p>
        </div>
        
        <div className="bg-neutral-white rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">🔧</div>
          <h2 className="text-2xl font-bold text-neutral-darkGray mb-4">
            AdminLayout đang được phát triển
          </h2>
          <p className="text-neutral-lightGray">
            Layout này sẽ có admin sidebar và dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;