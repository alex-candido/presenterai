import GettingStarted from '@/components/content/docs/getting-started.mdx';

type DocContentProps = {
  slug: string;
};

export function LandingDocsContent({ slug }: DocContentProps) {
  switch (slug) {
    case 'getting-started':
      return <GettingStarted />;
    default:
      return <div>Conteúdo não encontrado</div>;
  }
}
