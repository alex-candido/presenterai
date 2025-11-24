"use client";

import {
  AppPresentationsHeader,
  AppPresentationsSidebar,
  AppPresentationsTools,
  AppPresentationsWorkspace,
} from "@/components/pages/app/presentations";

export default function PresentationPage() {
  return (
    <div className="app-presentations-page">
      <AppPresentationsHeader />
      <AppPresentationsSidebar />
      <AppPresentationsWorkspace />
      <AppPresentationsTools />
    </div>
  );
}
