
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Layouts
import MainLayout from '../layouts/MainLayout';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import HomePage from '../pages/HomePage';
import MoviesPage from '../pages/MoviesPage';
import MovieDetailPage from '../pages/MovieDetailPage';
import ShowtimesPage from '../pages/ShowtimesPage';
import PricesPage from '../pages/PricesPage';
import PromotionsPage from '../pages/PromotionsPage';
import ReviewsPage from '../pages/ReviewsPage';
import AboutPage from '../pages/AboutPage';
import ServicesPage from '../pages/ServicesPage';

// Auth Pages
import AuthPage from '../features/auth/AuthPage';

// Protected Pages
import ProfilePage from '../pages/user/ProfilePage';
import MyBookingsPage from '../pages/user/MyBookingsPage';
import PaymentPage from '../features/booking/PaymentPage';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import SeatSelectionPage from '../features/booking/SeatSelectionPage';
import BookingLayout from '../layouts/BookingLayout';
import BookingCompletePage from "../features/booking/BookingCompletePage";

// Protected Route Component: Chặn truy cập nếu chưa đăng nhập
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-pink"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

// Admin Route Component: Chỉ cho phép admin (đã đăng nhập + isAdmin === true)
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-pink"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes - MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:id" element={<MovieDetailPage />} />
        <Route path="showtimes" element={<ShowtimesPage />} />
        <Route path="prices" element={<PricesPage />} />
        <Route path="promotions" element={<PromotionsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes - UserLayout: chỉ truy cập được khi đã đăng nhập */}
        <Route path="/user" element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="my-bookings" element={<MyBookingsPage />} />
        </Route>
      </Route>

      {/* Booking flow - protected and nested */}
      <Route path="/booking" element={
        <ProtectedRoute>
          <BookingLayout />
        </ProtectedRoute>
      }>
        <Route path="seat-selection" element={<SeatSelectionPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="complete" element={<BookingCompletePage />} />
      </Route>

      {/* Admin Routes: chỉ admin có thể truy cập */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Catch all route: URL không khớp -> quay về trang chủ */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;


