// Cinema Booking Color Palette - Hệ thống màu sắc cho trang booking vé xem phim
export const COLORS = {
  // Main Colors - Màu chủ đạo
  PRIMARY: {
    PINK: '#E91E63',      // Hồng/Magenta - nút CTA chính (Đặt vé, Đăng nhập, Mua vé ngay)
    PURPLE: '#2D1B69',    // Tím đậm - nền chính, gradient, header/footer
    BLACK: '#000000',     // Đen - background overlay, tạo cảm giác rạp chiếu phim tối
  },

  // Accent Colors - Màu nhấn
  ACCENT: {
    ORANGE: '#FF9800',    // Cam - mục "Phim sắp chiếu", nút phụ, hover effect
    YELLOW: '#FFC107',    // Vàng - icon vé, highlight tiêu đề hoặc rating phim (⭐)
    RED: '#F44336',       // Đỏ - thông báo lỗi, cảnh báo (ví dụ: "Sai mật khẩu")
  },

  // Neutral Colors - Màu phụ trợ
  NEUTRAL: {
    WHITE: '#FFFFFF',     // Trắng - text chính, tiêu đề phim, nền cho card
    DARK_GRAY: '#1A1A1A', // Xám đen - text phụ, mô tả phim
    LIGHT_GRAY: '#BDBDBD', // Xám nhạt - borders, dividers, placeholder text
  },

  // Cinematic Atmosphere - Màu bổ sung
  CINEMA: {
    NAVY: '#0D253F',      // Xanh navy - tạo chiều sâu, có thể dùng cho background thay tím
    NEON_BLUE: '#00E5FF', // Xanh neon - hiệu ứng neon cho poster, nút hover
    NEON_PINK: '#FF4081', // Hồng neon - tăng chất "giải trí" khi làm hover hoặc animation
  },

  // Gradient Definitions
  GRADIENTS: {
    PURPLE_PINK: 'linear-gradient(135deg, #2D1B69 0%, #E91E63 100%)',  // Banner, overlay
    PURPLE_NAVY: 'linear-gradient(135deg, #2D1B69 0%, #0D253F 100%)',  // Background alternative
    PINK_ORANGE: 'linear-gradient(135deg, #E91E63 0%, #FF9800 100%)',  // Accent gradient
  }
};

// Helper functions để sử dụng màu
export const getColor = (colorPath) => {
  const keys = colorPath.split('.');
  let result = COLORS;
  
  for (const key of keys) {
    result = result[key];
    if (result === undefined) {
      console.warn(`Color path "${colorPath}" not found`);
      return '#000000'; // fallback color
    }
  }
  
  return result;
};

// Export individual color groups for convenience
export const PRIMARY_COLORS = COLORS.PRIMARY;
export const ACCENT_COLORS = COLORS.ACCENT;
export const NEUTRAL_COLORS = COLORS.NEUTRAL;
export const CINEMA_COLORS = COLORS.CINEMA;
export const GRADIENT_COLORS = COLORS.GRADIENTS;

// Common usage patterns
export const COMMON_PATTERNS = {
  // CTA Buttons
  CTA_PRIMARY: COLORS.PRIMARY.PINK,
  CTA_SECONDARY: COLORS.ACCENT.ORANGE,
  
  // Backgrounds
  BG_PRIMARY: COLORS.PRIMARY.PURPLE,
  BG_SECONDARY: COLORS.CINEMA.NAVY,
  BG_OVERLAY: COLORS.PRIMARY.BLACK,
  
  // Text Colors
  TEXT_PRIMARY: COLORS.NEUTRAL.WHITE,
  TEXT_SECONDARY: COLORS.NEUTRAL.DARK_GRAY,
  TEXT_MUTED: COLORS.NEUTRAL.LIGHT_GRAY,
  
  // Status Colors
  SUCCESS: '#10b981',
  WARNING: COLORS.ACCENT.YELLOW,
  ERROR: COLORS.ACCENT.RED,
  INFO: COLORS.CINEMA.NEON_BLUE,
};
