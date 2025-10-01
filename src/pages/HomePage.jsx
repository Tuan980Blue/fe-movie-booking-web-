import React, { useState, useEffect } from 'react';
import {
  HeroSection,
  Promotions,
  MoviesShowcase
} from '../components/home';
import HomePageSkeleton from '../components/ui/HomePageSkeleton';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <MoviesShowcase />
      <Promotions />
    </div>
  );
};

export default HomePage;
