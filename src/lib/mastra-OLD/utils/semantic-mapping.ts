// src/lib/mastra/utils/semantic-mapping.ts
// Step 3 of the Outline Workflow — pure deterministic function.
// Parses each outline's representation string, resolves the representationKey
// against the library, and injects a config into each outline.

import type { Outline, OutlineConfig } from '@/schemas/app/generation-schema';
import { BRAND_COLORS, CANVAS } from '../constants/brand';
import {
  REPRESENTATION_KEYS,
  REPRESENTATIONS,
  type RepresentationKey,
} from '../constants/representations';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extracts the representation key from a representation string.
 * e.g. "FLOW (A → B → C)"  → "FLOW"
 *      "VENN-DIAGRAM (X × Y × Z)" → "VENN-DIAGRAM"
 *      "" → "FREE"
 */
function parseRepresentationKey(representation: string): RepresentationKey {
  if (!representation.trim()) return 'FREE';

  const upper = representation.toUpperCase().trim();

  // Try matching each known key as prefix (longest first to avoid partial matches)
  const sorted = [...REPRESENTATION_KEYS].sort((a, b) => b.length - a.length);
  for (const key of sorted) {
    if (upper.startsWith(key)) return key;
  }

  return 'FREE';
}

/**
 * For FLOW and FUNNEL, parses the labels inside parentheses to build
 * the sequence array with evenly spaced coordinates.
 * e.g. "FLOW (A → B → C → D)" → [{label:"A", x, y, w, h}, ...]
 */
function buildSequence(
  representation: string,
  key: RepresentationKey,
): OutlineConfig['contentLayout'] & { type: 'full' } {
  const match = representation.match(/\(([^)]+)\)/);
  if (!match) return { type: 'full', sequence: [] };

  const raw = match[1];
  const separator = raw.includes('→') ? '→' : raw.includes('->') ? '->' : '→';
  const labels = raw.split(separator).map((l) => l.trim()).filter(Boolean);

  if (labels.length === 0) return { type: 'full', sequence: [] };

  const { content } = CANVAS.zones;
  const nodeHeight = 60;
  const nodeY = content.y + (content.height - nodeHeight) / 2;

  if (key === 'FUNNEL') {
    // Stack vertically with decreasing widths
    const maxWidth = 480;
    const minWidth = 200;
    const step = labels.length > 1 ? (maxWidth - minWidth) / (labels.length - 1) : 0;
    const startY = content.y + 40;
    const gapY = 80;

    return {
      type: 'full',
      sequence: labels.map((label, i) => {
        const w = Math.round(maxWidth - step * i);
        const x = CANVAS.width / 2 - w / 2;
        return { label, x, y: startY + i * gapY, width: w, height: nodeHeight };
      }),
    };
  }

  // FLOW — horizontal sequence
  const totalWidth = content.width;
  const arrowWidth = 40;
  const totalArrows = labels.length - 1;
  const nodeWidth = Math.floor((totalWidth - totalArrows * arrowWidth) / labels.length);
  const startX = content.x;

  return {
    type: 'full',
    sequence: labels.map((label, i) => ({
      label,
      x: startX + i * (nodeWidth + arrowWidth),
      y: nodeY,
      width: nodeWidth,
      height: nodeHeight,
    })),
  };
}

// ─── Main function ────────────────────────────────────────────────────────────

/**
 * Enriches each outline with a `config` object derived from its `representation`.
 * Slides without a representation (COVER, SUMMARY, CLOSING) get a config based on their `type`.
 */
export function applySemanticMapping(outlines: Outline[]): (Outline & { config: OutlineConfig })[] {
  return outlines.map((outline) => {
    // Structural slides: resolve key by type first, ignoring representation
    const typeToKey: Partial<Record<typeof outline.type, RepresentationKey>> = {
      COVER:   'FREE',
      SUMMARY: 'LIST',
      SECTION: 'FREE',
      CLOSING: 'FREE',
    };

    const key: RepresentationKey =
      typeToKey[outline.type] ?? parseRepresentationKey(outline.representation);
    const template = REPRESENTATIONS[key];

    let contentLayout = template.contentLayout;

    // For FLOW and FUNNEL, compute the sequence from the representation labels
    if ((key === 'FLOW' || key === 'FUNNEL') && outline.representation) {
      contentLayout = buildSequence(outline.representation, key);
    }

    // CLOSING slides always get End/Success as primary color
    const suggestedColors =
      outline.type === 'CLOSING'
        ? { primary: BRAND_COLORS['End/Success'] }
        : template.suggestedColors;

    const config: OutlineConfig = {
      representationKey: key,
      zones: template.zones,
      contentLayout,
      suggestedColors,
      elementBudget: template.elementBudget,
    };

    return { ...outline, config };
  });
}
