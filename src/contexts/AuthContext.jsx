import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, parseUserFromAccessToken, getMeApi, mapMeResponseToUser, registerApi } from '../services/authService';

// Tạo Context để chia sẻ trạng thái/logic xác thực cho toàn bộ ứng dụng
// Context này đóng vai trò là “kênh” để truyền dữ liệu (ví dụ: thông tin người dùng đã đăng nhập, token,
// hàm đăng nhập/đăng xuất) xuống các component con mà không phải truyền props thủ công qua nhiều cấp.
const AuthContext = createContext();

// Hook tiện ích: lấy value từ AuthContext, đảm bảo chỉ dùng bên trong AuthProvider(bọc AuthProvider ở App.js)
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

  // Khi app tải: cố gắng khôi phục phiên nếu có;
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const userData = localStorage.getItem('user_data');

        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAdmin(parsedUser.role === 'admin');
          // Đồng bộ hồ sơ mới nhất từ server trong nền
          syncUserFromServer();
        } else {
          // Không có phiên: đảm bảo state trống
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
        setUser(null);
        setIsAdmin(false);
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

      // Lưu token và user vào sessionStorage để khôi phục phiên
      sessionStorage.setItem('access_token', accessToken);
      if (accessTokenExpiresAt) sessionStorage.setItem('access_token_expires_at', accessTokenExpiresAt);
      // Lưu refresh token: đặt cookie để interceptor có thể đọc, và lưu hạn vào localStorage
      if (refreshToken) {
        const seconds = refreshTokenExpiresAt
          ? Math.max(60, Math.ceil((new Date(refreshTokenExpiresAt) - new Date()) / 1000))
          : 14 * 24 * 60 * 60; // mặc định 14 ngày
        const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `refresh_token=${encodeURIComponent(refreshToken)}; Max-Age=${seconds}; Path=/; SameSite=Lax${secureFlag}`;
      }

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

  const register = async (formData) => {
    try {
      // Gọi API đăng ký: { email, password, fullName }
      const res = await registerApi({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName || formData.name,
      });

      const { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt } = res;

      const parsedUser = parseUserFromAccessToken(accessToken);
      if (!parsedUser) throw new Error('Invalid access token');

      const normalizedRole = (parsedUser.role || 'user').toString().toLowerCase();
      const tempUser = {
        id: parsedUser.id,
        name: parsedUser.name || parsedUser.email?.split('@')[0] || '',
        email: parsedUser.email,
        role: normalizedRole,
      };

      // Persist tokens
      sessionStorage.setItem('access_token', accessToken);
      if (accessTokenExpiresAt) sessionStorage.setItem('access_token_expires_at', accessTokenExpiresAt);
      if (refreshToken) {
        const seconds = refreshTokenExpiresAt
          ? Math.max(60, Math.ceil((new Date(refreshTokenExpiresAt) - new Date()) / 1000))
          : 14 * 24 * 60 * 60;
        const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `refresh_token=${encodeURIComponent(refreshToken)}; Max-Age=${seconds}; Path=/; SameSite=Lax${secureFlag}`;
      }

      localStorage.setItem('user_data', JSON.stringify(tempUser));

      setUser(tempUser);
      setIsAdmin(normalizedRole === 'admin');

      // Đồng bộ hồ sơ đầy đủ
      syncUserFromServer();

      return { success: true, user: tempUser };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Xoá dữ liệu phiên khỏi sessionStorage và reset state
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token_expires_at');
    localStorage.removeItem('user_data');

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
    updateProfile,
    refreshUser: syncUserFromServer,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
