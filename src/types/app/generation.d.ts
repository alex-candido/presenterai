type OutlineType = 'COVER' | 'SUMMARY' | 'CONTENT' | 'SECTION' | 'CLOSING';

type Zone = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type BrandColor = {
  purpose: string;
  fill: string;
  stroke: string;
};

type ContentLayout =
  | { type: 'free' }
  | { type: 'list' }
  | { type: 'full'; sequence?: { label: string; x: number; y: number; width: number; height: number }[] }
  | { type: 'split'; columns: { x: number; width: number }[]; divider?: { x: number; y: number; height: number } }
  | { type: 'grid'; columns: { x: number; width: number }[]; rows: { y: number; height: number }[] };

type OutlineConfig = {
  representationKey: string;
  zones: {
    header?:  Zone;
    content?: Zone;
    footer?:  Zone;
    full?:    Zone;
  };
  contentLayout: ContentLayout;
  suggestedColors: {
    primary:    BrandColor;
    secondary?: BrandColor;
  };
  elementBudget: number;
};

type Outline = {
  id?: string;
  order: string;
  type: OutlineType;
  layout: string;
  title: string;
  subtitle: string;
  description: string;
  representation: string;
  concepts: string[];
  config?: OutlineConfig;
};

type Outlines = Outline[];

