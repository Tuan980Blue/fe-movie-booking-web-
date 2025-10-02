import React from 'react';
import {
  HeroSection,
  Promotions,
  MoviesShowcase
} from '../components/home';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MoviesShowcase />
      <Promotions />
    </div>
  );
};

export default HomePage;
