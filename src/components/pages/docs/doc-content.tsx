// src/components/pages/docs/doc-content.tsx
import GettingStarted from '@/content/docs/getting-started.mdx';

type DocContentProps = {
  slug: string;
};

export function DocContent({ slug }: DocContentProps) {
  switch (slug) {
    case 'getting-started':
      return <GettingStarted />;
    default:
      return <div>Conteúdo não encontrado</div>;
  }
}
