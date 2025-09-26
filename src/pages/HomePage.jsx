import React from 'react';
import {
  HeroSection,
  FeaturedMoviesSection,
  ComingSoonSection,
  TodayShowtimesSection,
  QuickInfoSection,
  MoviesShowcase
} from '../components/home';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MoviesShowcase />
      <TodayShowtimesSection />
      <QuickInfoSection />
    </div>
  );
};

export default HomePage;
