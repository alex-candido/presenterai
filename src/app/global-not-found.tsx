import { ErrorPage } from "@/components/pages/error/root";

export default function GlobalNotFound() {
  return (
    <ErrorPage
      statusCode={404}
      title="Page Not Found"
      description="The page you are looking for does not exist."
    />
  );
}