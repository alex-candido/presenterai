"use client";

import {
  PresentationsHeader,
  PresentationsListSection,
  PresentationsStatsSection,
} from "@/components/pages/admin/presentations";

export default function AdminPresentationsPage() {
  return (
    <div className="admin-presentations-page">
      <PresentationsHeader />
      <PresentationsStatsSection />
      <PresentationsListSection />
    </div>
  );
}
