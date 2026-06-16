// src/lib/mastra/constants/representations.ts
// Library of representation templates used by Semantic Mapping (Step 3).
// Each key maps to a default config injected into OutlineEnriched.

import type { OutlineConfig } from '@/schemas/app/generation-schema';
import { BRAND_COLORS, CANVAS } from './brand';

const { zones } = CANVAS;

// Valid representation keys the outlineAgent must use.
export const REPRESENTATION_KEYS = [
  'FLOW',
  'COMPARISON',
  'FUNNEL',
  'MATRIX',
  'VENN-DIAGRAM',
  'CYCLE',
  'TIMELINE',
  'HIERARCHY',
  'CONVERGENCE',
  'LIST',
  'FREE',
] as const;

export type RepresentationKey = typeof REPRESENTATION_KEYS[number];

type RepresentationTemplate = Omit<OutlineConfig, 'representationKey'>;

export const REPRESENTATIONS: Record<RepresentationKey, RepresentationTemplate> = {

  FLOW: {
    zones: { header: zones.header, content: zones.content, footer: zones.footer },
    contentLayout: {
      type: 'full',
      sequence: [],  // populated dynamically by semantic-mapping based on parsed labels
    },
    suggestedColors: {
      primary:   BRAND_COLORS['Start/Trigger'],
      secondary: BRAND_COLORS['End/Success'],
    },
    elementBudget: 14,
  },

  COMPARISON: {
    zones: { header: zones.header, content: zones.content, footer: zones.footer },
    contentLayout: {
      type: 'split',
      columns: [
        { x: 40,  width: 320 },
        { x: 440, width: 320 },
      ],
      divider: { x: 400, y: 90, height: 440 },
    },
    suggestedColors: {
      primary:   BRAND_COLORS['Primary/Neutral'],
      secondary: BRAND_COLORS['Secondary'],
    },
    elementBudget: 12,
  },

  FUNNEL: {
    zones: { header: zones.header, content: zones.content, footer: zones.footer },
    contentLayout: {
      type: 'full',
      sequence: [],  // 3-4 rects with decreasing widths, populated dynamically
    },
    suggestedColors: {
      primary:   BRAND_COLORS['Primary/Neutral'],
      secondary: BRAND_COLORS['Tertiary'],
    },
    elementBudget: 12,
  },

  MATRIX: {
    zones: { header: zones.header, content: zones.content, footer: zones.footer },
    contentLayout: {
      type: 'grid',
      columns: [
        { x: 40,  width: 340 },
        { x: 420, width: 340 },
      ],
      rows: [
        { y: 90,  height: 210 },
        { y: 320, height: 210 },
      ],
    },
    suggestedColors: {
      primary:   BRAND_COLORS['Primary/Neutral'],
      secondary: BRAND_COLORS['Decision'],
    },
    elementBudget: 14,
  },

  'VENN-DIAGRAM': {
    zones: { header: zones.header, content: zones.content, footer: zones.footer },
    contentLayout: { type: 'full' },
    suggestedColors: {
      primary:   BRAND_COLORS['AI/LLM'],
      secondary: BRAND_COLORS['End/Success'],
    },
    elementBudget: 10,
  },

  CYCLE: {
    zones: { header: zones.header, content: zones.content, footer: zones.footer },
    contentLayout: { type: 'full' },
    suggestedColors: {
      primary:   BRAND_COLORS['Primary/Neutral'],
      secondary: BRAND_COLORS['Secondary'],
    },
    elementBudget: 14,
  },

  TIMELINE: {
    zones: { header: zones.header, content: zones.content, footer: zones.footer },
    contentLayout: { type: 'full' },
    suggestedColors: {
      primary:   BRAND_COLORS['Primary/Neutral'],
      secondary: BRAND_COLORS['Start/Trigger'],
    },
    elementBudget: 14,
  },

  HIERARCHY: {
    zones: { header: zones.header, content: zones.content, footer: zones.footer },
    contentLayout: { type: 'full' },
    suggestedColors: {
      primary:   BRAND_COLORS['Primary/Neutral'],
      secondary: BRAND_COLORS['Secondary'],
    },
    elementBudget: 14,
  },

  CONVERGENCE: {
    zones: { header: zones.header, content: zones.content, footer: zones.footer },
    contentLayout: { type: 'full' },
    suggestedColors: {
      primary:   BRAND_COLORS['AI/LLM'],
      secondary: BRAND_COLORS['Primary/Neutral'],
    },
    elementBudget: 12,
  },

  LIST: {
    zones: { header: zones.header, content: zones.content, footer: zones.footer },
    contentLayout: { type: 'list' },
    suggestedColors: {
      primary: BRAND_COLORS['Primary/Neutral'],
    },
    elementBudget: 10,
  },

  FREE: {
    zones: { full: zones.full },
    contentLayout: { type: 'free' },
    suggestedColors: {
      primary: BRAND_COLORS['Primary/Neutral'],
    },
    elementBudget: 6,
  },

};
