// src/lib/mastra/constants/brand.ts
// Single source of truth for brand colors and canvas defaults.

import type { BrandColor } from '@/schemas/app/generation-schema';

export const CANVAS = {
  width: 800,
  height: 600,
  margin: 40,
  zones: {
    header:  { x: 0,  y: 0,   width: 800, height: 80  },
    content: { x: 40, y: 80,  width: 720, height: 460 },
    footer:  { x: 0,  y: 540, width: 800, height: 60  },
    full:    { x: 0,  y: 0,   width: 800, height: 600 },
  },
} as const;

export const BRAND_COLORS: Record<string, BrandColor> = {
  'Primary/Neutral':    { purpose: 'Primary/Neutral',    fill: '#3b82f6', stroke: '#1e3a5f' },
  'Secondary':          { purpose: 'Secondary',          fill: '#60a5fa', stroke: '#1e3a5f' },
  'Tertiary':           { purpose: 'Tertiary',           fill: '#93c5fd', stroke: '#1e3a5f' },
  'Start/Trigger':      { purpose: 'Start/Trigger',      fill: '#fed7aa', stroke: '#c2410c' },
  'End/Success':        { purpose: 'End/Success',        fill: '#a7f3d0', stroke: '#047857' },
  'Warning/Reset':      { purpose: 'Warning/Reset',      fill: '#fee2e2', stroke: '#dc2626' },
  'Decision':           { purpose: 'Decision',           fill: '#fef3c7', stroke: '#b45309' },
  'AI/LLM':             { purpose: 'AI/LLM',             fill: '#ddd6fe', stroke: '#6d28d9' },
  'Inactive/Disabled':  { purpose: 'Inactive/Disabled',  fill: '#dbeafe', stroke: '#1e40af' },
  'Error':              { purpose: 'Error',              fill: '#fecaca', stroke: '#b91c1c' },
};

export const TEXT_COLORS = {
  title:       '#1e40af',
  subtitle:    '#3b82f6',
  body:        '#64748b',
  onLightFill: '#374151',
  onDarkFill:  '#ffffff',
  footer:      '#64748b',
} as const;

export const BACKGROUND_COLOR = '#ffffff';
