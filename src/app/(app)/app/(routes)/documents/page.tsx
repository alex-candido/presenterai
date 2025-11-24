"use client";

import {
  DocumentsHeader,
  DocumentsList,
  DocumentsToolbar
} from "@/components/pages/app/documents";

export default function DocumentsPage() {
  return (
    <div className="documents-page">
      <DocumentsHeader />
      <DocumentsToolbar />
      <DocumentsList />
    </div>
  );
}
