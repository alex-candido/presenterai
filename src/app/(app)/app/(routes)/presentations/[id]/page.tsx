"use client";

import {
  PresentationsHeader,
  PresentationsSidebar,
  PresentationsTools,
  PresentationsWorkspace,
} from "@/components/pages/app/presentations";

export default function PresentationPage() {
  return (
    <div className="presentations-page">
      <PresentationsHeader />
      <PresentationsSidebar />
      <PresentationsWorkspace />
      <PresentationsTools />
    </div>
  );
}
