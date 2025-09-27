import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EnhancedPopcornAnimation = () => {
  // Tạo array các items với các icon khác nhau
  const items = [
    { icon: '🍿', weight: 0.4 }, // Popcorn - nhiều nhất
    { icon: '🎬', weight: 0.2 }, // Film reel
    { icon: '⭐', weight: 0.2 }, // Star
    { icon: '🎭', weight: 0.1 }, // Theater masks
    { icon: '🎪', weight: 0.1 }, // Circus tent
  ];
  const shouldReduceMotion = useReducedMotion();

  // Tạo array các items với tỷ lệ theo weight (memoized)
  const allItems = useMemo(() => {
    const arr = [];
    const baseCount = shouldReduceMotion ? 10 : 20;
    items.forEach(item => {
      const count = Math.floor(item.weight * baseCount);
      for (let i = 0; i < count; i++) arr.push(item.icon);
    });
    return arr;
  }, [shouldReduceMotion]);

  // Tạo array các popcorn với vị trí và thời gian rơi khác nhau (memoized)
  const popcornItems = useMemo(() => {
    const len = shouldReduceMotion ? 12 : 24;
    return Array.from({ length: len }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 6,
      x: Math.random() * 100,
      size: 1.1 + Math.random() * 1.2,
      rotation: Math.random() * 720,
      icon: allItems[Math.floor(Math.random() * allItems.length)],
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, [allItems, shouldReduceMotion]);

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
            willChange: 'transform, opacity',
          }}
          initial={{
            y: -100,
            rotate: item.rotation,
            scale: 0.5
          }}
          animate={{
            y: '110vh',
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
