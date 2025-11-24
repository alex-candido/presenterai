import { cn } from "@/lib/utils";

import { AppDocumentsItem } from "@/components/pages/app/documents";

export function AppDocumentsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const documents = Array.from({ length: 5 }).map((_, i) => ({ id: i, name: `Document ${i + 1}` }));

  return (
    <div
      className={cn("app-documents-list grid gap-4", className)} 
      {...props}
    >
      {documents.map((doc) => (
        <AppDocumentsItem key={doc.id} />
      ))}
    </div>
  );
}
