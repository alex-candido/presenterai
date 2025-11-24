"use client";

import { DocContent } from '@/components/pages/docs/doc-content';
import { useParams } from "next/navigation";

export default function DocPage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div>
      <DocContent slug={slug} />
    </div>
  );
}
