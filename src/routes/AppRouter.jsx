
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
import BookingPage from '../pages/BookingPage';
import PaymentPage from '../pages/PaymentPage';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';

// Protected Route Component
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

// Admin Route Component
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
      </Route>

      {/* Auth Routes */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Protected Routes - UserLayout */}
      <Route path="/user" element={
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      }>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="my-bookings" element={<MyBookingsPage />} />
        <Route path="booking/:movieId" element={<BookingPage />} />
        <Route path="payment" element={<PaymentPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;


