import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter';
import './App.css';

const App = () => {
  return (
    // Bật định tuyến kiểu HTML5 History cho URL đẹp và chuyển trang mượt
    <BrowserRouter>
      {/* AuthProvider cung cấp context: user, isAuthenticated, isAdmin, isLoading và các hàm auth */}
      <AuthProvider>
        {/* Lớp nền toàn app với gradient; mọi route được render bởi AppRouter bên dưới */}
        <div className="min-h-screen bg-gradient-to-br from-primary-purple to-primary-pink">
          {/* AppRouter khai báo toàn bộ route (public/user/admin) và render theo URL hiện tại */}
          <AppRouter />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;


