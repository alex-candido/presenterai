import {
  AppFormSection,
  AppHero,
  AppRecentsSection,
  AppSuggestionsSection
} from "@/components/pages/app/start";

export default function AppPage() {
  return (
    <div className="app-start-page">
      <AppHero />
      <AppFormSection />
      <AppRecentsSection />
      <AppSuggestionsSection />
    </div>
  );
}
