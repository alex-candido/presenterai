"use client";

import {
  LandingHomeFaq,
  LandingHomeFeatures,
  LandingHomeHero,
  LandingHomePricing,
  LandingHomeTestimonials
} from "@/components/app/landing/home";

export default function HomePage() {
  return (
    <div className="landing-home-page">
      <LandingHomeHero />
      <LandingHomeFeatures />
      <LandingHomeTestimonials />
      <LandingHomePricing />
      <LandingHomeFaq />
    </div>
  );
}
