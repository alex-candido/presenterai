import {
  AppFormSection,
  AppHeroSection,
  AppRecentsSection,
  AppSuggestionsSection
} from "@/components/app/app";

export default function AppPage() {
  return (
    <div className="app-start-page">
      <AppHeroSection />
      <AppFormSection />
      <AppRecentsSection />
      <AppSuggestionsSection />
    </div>
  );
}
