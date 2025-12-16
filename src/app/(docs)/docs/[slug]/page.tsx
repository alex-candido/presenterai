"use client";

import { DocsContent } from '@/components/pages/docs/root';
import { useParams } from "next/navigation";

export default function DocPage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="docs-page">
      <DocsContent slug={slug} />
    </div>
  );
}
