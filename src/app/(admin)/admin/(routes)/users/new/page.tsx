"use client";

import {
  UsersForm,
  UsersHeader,
} from "@/components/pages/admin/users";

export default function AdminUserNewPage() {
  return (
    <div className="admin-user-new-page">
      <UsersHeader /> {/* Dynamic title like "New User" */}
      <UsersForm />
    </div>
  );
}
