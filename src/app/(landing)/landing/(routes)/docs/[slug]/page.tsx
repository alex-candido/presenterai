"use client";

import { LandingDocsContent } from '@/components/pages/landing/docs/root';
import { useParams } from "next/navigation";

export default function DocPage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="landing-docs-page">
      <LandingDocsContent slug={slug} />
    </div>
  );
}
