import { cn } from "@/lib/utils";

import { DocumentsItem } from "@/components/pages/app/documents";

export function DocumentsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const documents = Array.from({ length: 5 }).map((_, i) => ({ id: i, name: `Document ${i + 1}` }));

  return (
    <div
      className={cn("documents-list grid gap-4", className)} 
      {...props}
    >
      {documents.map((doc) => (
        <DocumentsItem key={doc.id} />
      ))}
    </div>
  );
}
