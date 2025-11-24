// src/components/pages/terms/legal-content.tsx
import PrivacyPolicy from '@/content/legal/privacy-policy.mdx';
import TermsOfService from '@/content/legal/terms-of-service.mdx';

type LegalContentProps = {
  slug: string;
};

export function LegalContent({ slug }: LegalContentProps) {
  switch (slug) {
    case 'privacy-policy':
      return <PrivacyPolicy />;
    case 'terms-of-service':
      return <TermsOfService />;
    default:
      return <div>Conteúdo não encontrado</div>;
  }
}
