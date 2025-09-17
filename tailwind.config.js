/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        // Main Colors - Màu chủ đạo
        primary: {
          pink: '#E91E63',      // Hồng/Magenta - nút CTA chính
          purple: '#2D1B69',    // Tím đậm - nền chính, header/footer
          black: '#000000',     // Đen - background overlay
        },
        
        // Accent Colors - Màu nhấn
        accent: {
          orange: '#FF9800',    // Cam - phim sắp chiếu, nút phụ
          yellow: '#FFC107',    // Vàng - icon vé, rating phim
          red: '#F44336',       // Đỏ - thông báo lỗi, cảnh báo
        },
        
        // Neutral Colors - Màu phụ trợ
        neutral: {
          white: '#FFFFFF',     // Trắng - text chính, tiêu đề
          darkGray: '#1A1A1A',  // Xám đen - text phụ, mô tả
          lightGray: '#BDBDBD', // Xám nhạt - borders, placeholder
        },
        
        // Cinematic Atmosphere - Màu bổ sung
        cinema: {
          navy: '#0D253F',      // Xanh navy - tạo chiều sâu
          neonBlue: '#00E5FF',  // Xanh neon - hiệu ứng neon
          neonPink: '#FF4081',  // Hồng neon - animation, hover
        },
        
        // Gradient colors for easy reference
        gradient: {
          purplePink: 'linear-gradient(135deg, #2D1B69 0%, #E91E63 100%)',
          purpleNavy: 'linear-gradient(135deg, #2D1B69 0%, #0D253F 100%)',
          pinkOrange: 'linear-gradient(135deg, #E91E63 0%, #FF9800 100%)',
        }
      },
    },
  },
  plugins: [],
};


