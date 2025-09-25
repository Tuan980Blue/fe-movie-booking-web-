import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="min-h-screen py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-neutral-white rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <aside className="md:w-64">
              <nav className="space-y-2">
                <NavLink
                  to="/user/profile"
                  className={({ isActive }) => `block px-4 py-2 rounded-lg ${isActive ? 'bg-primary-purple text-neutral-white' : 'bg-neutral-lightGray text-neutral-darkGray'}`}
                >
                  Hồ sơ cá nhân
                </NavLink>
                <NavLink
                  to="/user/my-bookings"
                  className={({ isActive }) => `block px-4 py-2 rounded-lg ${isActive ? 'bg-primary-purple text-neutral-white' : 'bg-neutral-lightGray text-neutral-darkGray'}`}
                >
                  Vé của tôi
                </NavLink>
              </nav>
            </aside>
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
