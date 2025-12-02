'use client'; // Error boundaries must be Client Components

import { ErrorPage } from "@/components/pages/error/root";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  let description = "Something went wrong on our end. Please try again in a few moments.";

  if (isDevelopment) {
    description += ` | Message: ${error.message} | Digest: ${error.digest || 'N/A'}`;
  }

  return (
    // global-error must include html and body tags
    <html>
      <body>
        <ErrorPage
          statusCode={500}
          title="Internal Server Error"
          description={description}
          showGoHomeButton={false}
        />
        <div className="text-center mt-4">
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}