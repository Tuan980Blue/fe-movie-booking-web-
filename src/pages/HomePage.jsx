import React from 'react';
import {
  HeroSection,
  FeaturedMoviesSection,
  ComingSoonSection,
  TodayShowtimesSection,
  QuickInfoSection
} from '../components/home';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedMoviesSection />
      <ComingSoonSection />
      <TodayShowtimesSection />
      <QuickInfoSection />
    </div>
  );
};

export default HomePage;
