import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, parseUserFromAccessToken, getMeApi, mapMeResponseToUser } from '../services/authService';

// Tạo Context để chia sẻ trạng thái/logic xác thực cho toàn bộ ứng dụng
const AuthContext = createContext();

// Hook tiện ích: lấy value từ AuthContext, đảm bảo chỉ dùng bên trong AuthProvider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Khi app tải: cố gắng khôi phục phiên từ localStorage (mock cho demo)
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('access_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          // Đặt cờ admin dựa trên role của user (lưu ý: client-side chỉ mang tính UX)
          setIsAdmin(parsedUser.role === 'admin');
          // Đồng bộ hồ sơ mới nhất từ server trong nền
          syncUserFromServer();
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const syncUserFromServer = async () => {
    try {
      const me = await getMeApi();
      const mapped = mapMeResponseToUser(me);
      if (mapped) {
        const normalizedRole = (mapped.role || 'user').toString().toLowerCase();
        const finalUser = { ...mapped, role: normalizedRole };
        localStorage.setItem('user_data', JSON.stringify(finalUser));
        setUser(finalUser);
        setIsAdmin(normalizedRole === 'admin');
      }
    } catch (_e) {
      // Nếu lỗi (401/403) giữ nguyên state hiện tại; interceptor sẽ xử lý token
    }
  };

  const login = async (userData) => {
    try {
      // Gọi API đăng nhập thật
      const res = await loginApi({ email: userData.email, password: userData.password });
      const { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt } = res;

      // Giải mã token để lấy thông tin user và role
      const parsedUser = parseUserFromAccessToken(accessToken);
      if (!parsedUser) {
        throw new Error('Invalid access token');
      }

      // Chuẩn hoá role về chữ thường để so sánh an toàn
      const normalizedRole = (parsedUser.role || 'user').toString().toLowerCase();
      const finalUser = {
        id: parsedUser.id,
        name: parsedUser.name || parsedUser.email?.split('@')[0] || '',
        email: parsedUser.email,
        role: normalizedRole,
      };

      // Lưu token và user vào localStorage để khôi phục phiên
      localStorage.setItem('access_token', accessToken);
      if (accessTokenExpiresAt) localStorage.setItem('access_token_expires_at', accessTokenExpiresAt);
      // Lưu refresh token: đặt cookie để interceptor có thể đọc, và lưu hạn vào localStorage
      if (refreshToken) {
        const seconds = refreshTokenExpiresAt
          ? Math.max(60, Math.ceil((new Date(refreshTokenExpiresAt) - new Date()) / 1000))
          : 14 * 24 * 60 * 60; // mặc định 14 ngày
        const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `refresh_token=${encodeURIComponent(refreshToken)}; Max-Age=${seconds}; Path=/; SameSite=Lax${secureFlag}`;
      }
      if (refreshTokenExpiresAt) localStorage.setItem('refresh_token_expires_at', refreshTokenExpiresAt);
      localStorage.setItem('user_data', JSON.stringify(finalUser));

      setUser(finalUser);
      setIsAdmin(normalizedRole === 'admin');

      // Đồng bộ hồ sơ đầy đủ từ server (không chặn luồng login)
      syncUserFromServer();

      return { success: true, user: finalUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Giả lập API đăng ký: tạo user mới role 'user'
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: 'user',
        avatar: null,
        createdAt: new Date().toISOString()
      };

      const mockToken = `mock_token_${Date.now()}`;

      // Lưu phiên vào localStorage (demo)
      localStorage.setItem('access_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAdmin(false);

      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Xoá dữ liệu phiên khỏi localStorage và reset state
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expires_at');
    localStorage.removeItem('user_data');
    localStorage.removeItem('refresh_token_expires_at');
    // Xoá cookie refresh token
    document.cookie = 'refresh_token=; Max-Age=-1; path=/';
    setUser(null);
    setIsAdmin(false);
  };

  const updateProfile = (updatedData) => {
    // Cập nhật hồ sơ trong state và đồng bộ lại localStorage
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
