"use client";

import {
    UsersForm,
    UsersHeader,
} from "@/components/app/admin/users";

export default function AdminUserEditPage() {
  return (
    <div className="admin-user-edit-page">
      <UsersHeader /> {/* Dynamic title like "Edit User #[id]" */}
      <UsersForm />
    </div>
  );
}
