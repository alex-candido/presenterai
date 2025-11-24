"use client";

import {
  HomeFAQSection,
  HomeFeaturesSection,
  HomeHeroSection,
  HomePricingSection,
  HomeTestimonialsSection
} from "@/components/pages/home/root";

export default function HomePage() {
  return (
    <div className="home-page">
      <HomeHeroSection />
      <HomeFeaturesSection />
      <HomeTestimonialsSection />
      <HomePricingSection />
      <HomeFAQSection />
    </div>
  );
}
