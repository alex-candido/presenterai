import {
  AppFormSection,
  AppHeaderSection,
  AppRecentsSection,
  AppSuggestionsSection
} from "@/components/pages/app/start";

export default function AppPage() {
  return (
    <div className="app-start-page">
      <AppHeaderSection />
      <AppFormSection />
      <AppRecentsSection />
      <AppSuggestionsSection />
    </div>
  );
}
