"use client";

import { LegalContent } from '@/components/pages/terms/legal-content';
import { useParams } from 'next/navigation';

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div>
      <LegalContent slug={slug} />
    </div>
  );
}