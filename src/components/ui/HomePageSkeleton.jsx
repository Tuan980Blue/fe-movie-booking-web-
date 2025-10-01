import React from 'react';

const HomePageSkeleton = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Movie Image Slices Skeleton */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="relative flex-1 h-full">
              {/* Movie Image Skeleton */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-lightGray/20 via-neutral-lightGray/40 to-neutral-lightGray/20 animate-pulse" />
              
              {/* Slice Overlay Skeleton */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-900/20" />
              
              {/* Movie Info Overlay Skeleton */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-white">
                  <div className="h-8 md:h-10 lg:h-12 bg-white/20 rounded-lg animate-pulse mb-2" />
                  <div className="flex items-center gap-4">
                    <div className="h-4 bg-white/15 rounded animate-pulse w-24" />
                    <div className="h-4 bg-white/15 rounded animate-pulse w-1" />
                    <div className="h-4 bg-white/15 rounded animate-pulse w-12" />
                  </div>
                </div>
              </div>
              
              {/* Slice Number Indicator Skeleton */}
              <div className="absolute top-8 right-8">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-pink-500/20 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Floating Cinema Elements Skeleton */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-12 h-12 bg-yellow-400/20 rounded animate-pulse" />
          <div className="absolute top-32 right-32 w-10 h-10 bg-blue-400/20 rounded animate-pulse" />
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-pink-400/20 rounded animate-pulse" />
          <div className="absolute bottom-20 right-20 w-12 h-12 bg-yellow-400/20 rounded animate-pulse" />
        </div>
        
        {/* Main Content Overlay Skeleton */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 py-20">
          <div className="max-w-7xl mx-auto text-center">
            {/* Logo/Brand Skeleton */}
            <div className="mb-8">
              <div className="inline-block px-8 py-6 rounded-2xl backdrop-blur-md border bg-black/20 animate-pulse">
                <div className="h-16 md:h-20 lg:h-24 bg-white/20 rounded animate-pulse" />
              </div>
            </div>
            
            {/* Subtitle Skeleton */}
            <div className="h-6 md:h-7 lg:h-8 bg-white/20 rounded animate-pulse mb-8 max-w-4xl mx-auto" />
            
            {/* Feature Pills Skeleton */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="px-4 py-2 md:px-6 md:py-3 rounded-full border backdrop-blur-md bg-black/20 animate-pulse">
                  <div className="h-4 md:h-5 w-20 md:w-24 bg-white/20 rounded" />
                </div>
              ))}
            </div>
            
            {/* CTA Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-16">
              <div className="w-full sm:w-auto h-12 md:h-14 bg-pink-500/20 rounded-full animate-pulse" />
              <div className="w-full sm:w-auto h-12 md:h-14 bg-white/20 rounded-full animate-pulse" />
            </div>
            
            {/* Stats Row Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="text-center p-4 rounded-xl backdrop-blur-md border bg-black/20 animate-pulse">
                  <div className="h-8 md:h-10 lg:h-12 bg-yellow-400/20 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-white/20 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Movies Showcase Skeleton */}
      <section className="py-12 md:py-16 px-4 lg:px-8 bg-gradient-to-b from-transparent via-[#2a0a3a]/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 md:h-12 w-32 md:w-40 bg-white/20 rounded-xl animate-pulse" />
              <div className="h-10 md:h-12 w-32 md:w-40 bg-white/20 rounded-xl animate-pulse" />
            </div>
            <div className="hidden md:block h-4 w-24 bg-white/20 rounded animate-pulse" />
          </div>
          
          <div className="relative">
            {/* Left/Right controls Skeleton */}
            <div className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 animate-pulse" />
            <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 animate-pulse" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="group rounded-2xl overflow-hidden bg-white border border-neutral-lightGray/70 shadow-sm">
                  <div className="relative aspect-[2/3] bg-neutral-lightGray/30 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-neutral-lightGray/20 via-neutral-lightGray/40 to-neutral-lightGray/20 animate-pulse" />
                    <div className="absolute top-3 right-3 w-8 h-4 bg-black/20 rounded animate-pulse" />
                  </div>
                  <div className="p-3">
                    <div className="h-4 md:h-5 bg-neutral-lightGray/40 rounded animate-pulse mb-1" />
                    <div className="h-3 bg-neutral-lightGray/30 rounded animate-pulse w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Promotions Skeleton */}
      <section className="py-4 lg:py-10 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header Skeleton */}
          <div className="text-start mb-4 lg:mb-10">
            <div className="h-6 md:h-8 w-48 bg-white/20 rounded animate-pulse mb-1 lg:mb-4" />
            <div className="h-5 w-64 bg-white/15 rounded animate-pulse" />
          </div>
          
          {/* Promotions Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                {/* Content Skeleton */}
                <div className="relative z-10 p-8">
                  {/* Icon & Badge Skeleton */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded animate-pulse" />
                      <div className="h-6 w-16 bg-red-400/20 rounded-full animate-pulse" />
                    </div>
                    <div className="h-4 w-20 bg-white/15 rounded animate-pulse" />
                  </div>
                  
                  {/* Title & Description Skeleton */}
                  <div className="mb-6">
                    <div className="h-6 w-3/4 bg-white/20 rounded animate-pulse mb-3" />
                    <div className="space-y-2">
                      <div className="h-4 bg-white/15 rounded animate-pulse" />
                      <div className="h-4 bg-white/15 rounded animate-pulse w-5/6" />
                    </div>
                  </div>
                  
                  {/* Price Section Skeleton */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-3 mb-2">
                      <div className="h-5 w-20 bg-white/15 rounded animate-pulse" />
                      <div className="h-6 w-16 bg-pink-500/20 rounded animate-pulse" />
                    </div>
                    <div className="h-3 w-32 bg-white/15 rounded animate-pulse" />
                  </div>
                  
                  {/* CTA Button Skeleton */}
                  <div className="w-full h-12 bg-pink-500/20 rounded-xl animate-pulse" />
                </div>
                
                {/* Decorative Elements Skeleton */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-pink-500/10 animate-pulse" />
                <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-yellow-400/10 animate-pulse" />
              </div>
            ))}
          </div>
          
          {/* Additional Info Skeleton */}
          <div className="mt-6 text-center">
            <div className="h-4 w-80 bg-white/15 rounded animate-pulse mx-auto mb-4" />
            <div className="h-4 w-40 bg-pink-500/20 rounded animate-pulse mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageSkeleton;
