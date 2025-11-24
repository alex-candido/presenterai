"use client";

import {
  UsersHeader,
  UsersListSection,
  UsersStatsSection,
} from "@/components/pages/admin/users";

export default function AdminUsersPage() {
  return (
    <div className="admin-users-page">
      <UsersHeader />
      <UsersStatsSection />
      <UsersListSection />
    </div>
  );
}
