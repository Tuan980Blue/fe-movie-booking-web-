import React from 'react';
import {
  HeroSection,
  TodayShowtimesSection,
  MoviesShowcase
} from '../components/home';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MoviesShowcase />
      <TodayShowtimesSection />
    </div>
  );
};

export default HomePage;
