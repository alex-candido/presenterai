import {
  AppForm,
  AppHeader,
  AppRecents,
  AppSuggestions
} from "@/components/pages/app/root";

export default function AppPage() {
  return (
    <div className="app-page">
      <AppHeader />
      <AppForm />
      <AppRecents />
      <AppSuggestions />
    </div>
  );
}
