import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading, isAdmin } = useAuth();

  const formatDate = (value) => {
    if (!value) return '-';
    try {
      return new Date(value).toLocaleString();
    } catch (_e) {
      return value;
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-white mb-4">👤 Thông tin cá nhân</h1>
          <p className="text-neutral-white opacity-75 text-lg">Quản lý thông tin tài khoản</p>
        </div>

        <div className="bg-neutral-white rounded-2xl p-8">
          {isLoading ? (
            <div className="min-h-[120px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-pink"></div>
            </div>
          ) : !isAuthenticated || !user ? (
            <div className="text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-neutral-darkGray mb-2">Bạn chưa đăng nhập</h2>
              <p className="text-neutral-lightGray">Vui lòng đăng nhập để xem thông tin cá nhân.</p>
            </div>
          ) : (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-purple text-neutral-white flex items-center justify-center text-3xl">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-darkGray">{user.name || '-'}</h2>
                    <p className="text-neutral-lightGray">{user.email || '-'}</p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${isAdmin ? 'bg-green-100 text-green-700' : 'bg-neutral-lightGray text-neutral-darkGray'}`}>
                    {isAdmin ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border rounded-xl p-5">
                  <div className="text-neutral-lightGray text-sm mb-1">ID</div>
                  <div className="font-semibold text-neutral-darkGray break-all">{user.id || '-'}</div>
                </div>
                <div className="border rounded-xl p-5">
                  <div className="text-neutral-lightGray text-sm mb-1">Email</div>
                  <div className="font-semibold text-neutral-darkGray">{user.email || '-'}</div>
                </div>
                <div className="border rounded-xl p-5">
                  <div className="text-neutral-lightGray text-sm mb-1">Họ và tên</div>
                  <div className="font-semibold text-neutral-darkGray">{user.name || '-'}</div>
                </div>
                <div className="border rounded-xl p-5">
                  <div className="text-neutral-lightGray text-sm mb-1">Điện thoại</div>
                  <div className="font-semibold text-neutral-darkGray">{user.phone || '-'}</div>
                </div>
                <div className="border rounded-xl p-5">
                  <div className="text-neutral-lightGray text-sm mb-1">Trạng thái</div>
                  <div className="font-semibold text-neutral-darkGray">{user.status || '-'}</div>
                </div>
                <div className="border rounded-xl p-5">
                  <div className="text-neutral-lightGray text-sm mb-1">Vai trò</div>
                  <div className="font-semibold text-neutral-darkGray capitalize">{user.role || '-'}</div>
                </div>
                <div className="border rounded-xl p-5">
                  <div className="text-neutral-lightGray text-sm mb-1">Tạo lúc</div>
                  <div className="font-semibold text-neutral-darkGray">{formatDate(user.createdAt)}</div>
                </div>
                <div className="border rounded-xl p-5">
                  <div className="text-neutral-lightGray text-sm mb-1">Cập nhật lúc</div>
                  <div className="font-semibold text-neutral-darkGray">{formatDate(user.updatedAt)}</div>
                </div>
                {Array.isArray(user.roles) && (
                  <div className="border rounded-xl p-5 sm:col-span-2">
                    <div className="text-neutral-lightGray text-sm mb-1">Danh sách vai trò</div>
                    <div className="font-semibold text-neutral-darkGray">
                      {user.roles.length ? user.roles.join(', ') : '-'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
