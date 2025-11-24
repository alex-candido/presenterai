"use client";

import { LandingLegalContent } from '@/components/pages/landing/terms/root';
import { useParams } from 'next/navigation';

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="landing-legal-page">
      <LandingLegalContent slug={slug} />
    </div>
  );
}