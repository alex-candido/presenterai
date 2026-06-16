"use client";

import {
    UsersDetails,
    UsersHeader,
} from "@/components/app/admin/users";

export default function AdminUserDetailsPage() {
  return (
    <div className="admin-user-details-page">
      <UsersHeader /> {/* Dynamic title like "User Details #[id]" */}
      <UsersDetails />
    </div>
  );
}
