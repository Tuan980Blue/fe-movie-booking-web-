import React from 'react';
import { motion } from 'framer-motion';

const EnhancedPopcornAnimation = () => {
  // Tạo array các items với các icon khác nhau
  const items = [
    { icon: '🍿', weight: 0.4 }, // Popcorn - nhiều nhất
    { icon: '🎬', weight: 0.2 }, // Film reel
    { icon: '⭐', weight: 0.2 }, // Star
    { icon: '🎭', weight: 0.1 }, // Theater masks
    { icon: '🎪', weight: 0.1 }, // Circus tent
  ];

  // Tạo array các items với tỷ lệ theo weight
  const allItems = [];
  items.forEach(item => {
    const count = Math.floor(item.weight * 20); // Tổng ~20 items
    for (let i = 0; i < count; i++) {
      allItems.push(item.icon);
    }
  });

  // Tạo array các popcorn với vị trí và thời gian rơi khác nhau
  const popcornItems = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8, // Delay ngẫu nhiên 0-8s
    duration: 4 + Math.random() * 6, // Thời gian rơi 4-10s
    x: Math.random() * 100, // Vị trí ngang ngẫu nhiên
    size: 0.6 + Math.random() * 0.8, // Kích thước ngẫu nhiên
    rotation: Math.random() * 720, // Góc xoay ngẫu nhiên (2 vòng)
    icon: allItems[Math.floor(Math.random() * allItems.length)],
    opacity: 0.3 + Math.random() * 0.4, // Độ trong suốt ngẫu nhiên
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {popcornItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: '-100px',
            fontSize: `${item.size}em`,
            opacity: item.opacity,
          }}
          initial={{
            y: -100,
            rotate: item.rotation,
            scale: 0.5
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            rotate: item.rotation + 720, // Xoay 2 vòng khi rơi
            scale: 1,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default EnhancedPopcornAnimation;
