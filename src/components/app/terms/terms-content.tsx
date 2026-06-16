import PrivacyPolicy from '@/components/content/legal/privacy-policy.mdx';
import TermsOfService from '@/components/content/legal/terms-of-service.mdx';

type LegalContentProps = {
  slug: string;
};

export function LandingLegalContent({ slug }: LegalContentProps) {
  switch (slug) {
    case 'privacy-policy':
      return <PrivacyPolicy />;
    case 'terms-of-service':
      return <TermsOfService />;
    default:
      return <div>Conteúdo não encontrado</div>;
  }
}