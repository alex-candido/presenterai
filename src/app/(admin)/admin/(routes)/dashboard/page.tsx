"use client";

import {
  DashboardDocumentsSummarySection,
  DashboardGenerationsSummarySection,
  DashboardHeader,
  DashboardPresentationsSummarySection,
  DashboardRecentActivitySection,
  DashboardStatsSection,
  DashboardUserSummarySection
} from "@/components/pages/admin/dashboard";

export default function DashboardPage() {
  return (
    <div className="admin-dashboard-page">
      <DashboardHeader />
      <DashboardStatsSection />
      <DashboardRecentActivitySection />
      <DashboardUserSummarySection />
      <DashboardGenerationsSummarySection />
      <DashboardDocumentsSummarySection />
      <DashboardPresentationsSummarySection />
    </div>
  );
}
