import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CinemaAuthPage from '../app/CinemaAuthPage';
import HomePage from '../pages/HomePage';

// Simple router with only Home and Auth

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<CinemaAuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;


