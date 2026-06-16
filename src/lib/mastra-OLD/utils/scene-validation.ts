// src/lib/mastra/utils/scene-validation.ts
// Step 3 of the Scene Workflow — pure deterministic function, zero AI calls.
// Receives a RawScene + SpatialPlan, applies corrections and returns a ValidatedScene.

import type { ValidationIssue, ValidationResult } from '@/schemas/app/spatial-schema';

type AnyElement = Record<string, any>;

type RawScene = {
  type: string;
  elements: AnyElement[];
  files: Record<string, any>;
};

type ValidatedScene = RawScene & {
  _validation: ValidationResult;
};

// ─── Fix 1: z-index ordering ─────────────────────────────────────────────────
// Excalidraw renders in array order. Rule: shapes → bound text → free text → arrows.

function fixZIndex(elements: AnyElement[]): { elements: AnyElement[]; issues: ValidationIssue[] } {
  const issues: ValidationIssue[] = [];

  const frames   = elements.filter((e) => e.type === 'frame');
  const shapes   = elements.filter((e) => ['rectangle', 'ellipse', 'diamond'].includes(e.type) && !e.containerId);
  const boundTxt = elements.filter((e) => e.type === 'text' && e.containerId);
  const freeTxt  = elements.filter((e) => e.type === 'text' && !e.containerId);
  const lines    = elements.filter((e) => e.type === 'line');
  const arrows   = elements.filter((e) => e.type === 'arrow');

  const ordered = [...frames, ...shapes, ...boundTxt, ...freeTxt, ...lines, ...arrows];

  // Check if reordering was needed
  const originalIds = elements.map((e) => e.id).join(',');
  const orderedIds  = ordered.map((e) => e.id).join(',');

  if (originalIds !== orderedIds) {
    issues.push({
      elementId: '__all__',
      issue: 'z-index',
      detail: 'Reordered elements: shapes → bound text → free text → lines → arrows',
      fixed: true,
    });
  }

  // Re-assign index values sequentially
  const reindexed = ordered.map((el, i) => ({
    ...el,
    index: `a${i}`,
  }));

  return { elements: reindexed, issues };
}

// ─── Fix 2: auto-resize text containers ──────────────────────────────────────
// If a text element's content is longer than its container's width, expand the container.

const CHAR_WIDTH_APPROX = 8; // px per character at ~14px font

function fixTextOverflow(elements: AnyElement[]): { elements: AnyElement[]; issues: ValidationIssue[] } {
  const issues: ValidationIssue[] = [];
  const elementMap = new Map(elements.map((e) => [e.id, e]));
  const updated = [...elements];

  for (const el of updated) {
    if (el.type !== 'text' || !el.containerId || !el.text) continue;

    const container = elementMap.get(el.containerId);
    if (!container) continue;

    const estimatedWidth = (el.text.length * CHAR_WIDTH_APPROX) + 16; // 8px padding each side
    if (estimatedWidth > container.width) {
      const idx = updated.indexOf(container);
      const originalWidth = container.width;
      const newWidth = Math.min(estimatedWidth, 720); // cap at content zone width
      updated[idx] = { ...container, width: newWidth };

      issues.push({
        elementId: container.id,
        issue: 'text-overflow',
        detail: `Expanded width from ${originalWidth} to ${newWidth} for text: "${el.text.substring(0, 30)}"`,
        fixed: true,
      });
    }
  }

  return { elements: updated, issues };
}

// ─── Fix 0: ensure frame element ─────────────────────────────────────────────
// Every slide MUST have exactly one frame element at (0,0,800x600).
// All non-frame elements must have frameId pointing to it.

export function ensureFrame(
  elements: AnyElement[],
  slideOrder: string,
): { elements: AnyElement[]; issues: ValidationIssue[] } {
  const issues: ValidationIssue[] = [];

  const existingFrame = elements.find((e) => e.type === 'frame');

  if (existingFrame) {
    // Patch elements that are missing the frameId reference
    let patched = 0;
    const updated = elements.map((e) => {
      if (e.type === 'frame') return e;
      if (e.frameId === existingFrame.id) return e;
      patched++;
      return { ...e, frameId: existingFrame.id };
    });
    if (patched > 0) {
      issues.push({
        elementId: existingFrame.id,
        issue: 'missing-frame',
        detail: `Set frameId on ${patched} element(s) that were missing it`,
        fixed: true,
      });
    }
    return { elements: updated, issues };
  }

  // Inject a new frame element
  const frameId = `frame-${slideOrder}`;
  const frame: AnyElement = {
    type: 'frame',
    id: frameId,
    x: 0,
    y: 0,
    width: CANVAS_W,
    height: CANVAS_H,
    name: `Slide ${slideOrder}`,
    angle: 0,
    strokeColor: '#bbb',
    backgroundColor: 'transparent',
    fillStyle: 'solid',
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 0,
    opacity: 100,
    groupIds: [],
    frameId: null,
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
    seed: Math.floor(Math.random() * 1_000_000),
    version: 1,
    versionNonce: Math.floor(Math.random() * 1_000_000),
    isDeleted: false,
    isCollapsed: false,
  };

  const framed = elements.map((e) => ({ ...e, frameId }));

  issues.push({
    elementId: frameId,
    issue: 'missing-frame',
    detail: `Injected frame element for slide ${slideOrder}`,
    fixed: true,
  });

  return { elements: [frame, ...framed], issues };
}

// ─── Fix 3: bounds clamping ───────────────────────────────────────────────────
// Clamp elements that exceed the canvas boundaries.

const CANVAS_W = 800;
const CANVAS_H = 600;

function fixOutOfBounds(elements: AnyElement[]): { elements: AnyElement[]; issues: ValidationIssue[] } {
  const issues: ValidationIssue[] = [];

  const clamped = elements.map((el) => {
    if (el.type === 'text' || el.type === 'arrow' || el.type === 'line') return el;

    let { x, y, width, height } = el;
    let changed = false;

    if (x < 0)                    { x = 0;              changed = true; }
    if (y < 0)                    { y = 0;              changed = true; }
    if (x + width  > CANVAS_W)   { width  = CANVAS_W - x;  changed = true; }
    if (y + height > CANVAS_H)   { height = CANVAS_H - y;  changed = true; }

    if (changed) {
      issues.push({
        elementId: el.id,
        issue: 'out-of-bounds',
        detail: `Clamped to canvas bounds [0,${CANVAS_W}]x[0,${CANVAS_H}]`,
        fixed: true,
      });
      return { ...el, x, y, width, height };
    }

    return el;
  });

  return { elements: clamped, issues };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function validateScene(rawScene: RawScene, slideOrder = '0'): ValidatedScene {
  if (!Array.isArray(rawScene.elements) || rawScene.elements.length === 0) {
    return {
      ...rawScene,
      _validation: { issues: [], fixedCount: 0 },
    };
  }

  const allIssues: ValidationIssue[] = [];
  let elements = rawScene.elements;

  // Pass 0: ensure frame exists and all elements reference it
  const r0 = ensureFrame(elements, slideOrder);
  elements = r0.elements;
  allIssues.push(...r0.issues);

  const r1 = fixOutOfBounds(elements);
  elements = r1.elements;
  allIssues.push(...r1.issues);

  const r2 = fixTextOverflow(elements);
  elements = r2.elements;
  allIssues.push(...r2.issues);

  const r3 = fixZIndex(elements);
  elements = r3.elements;
  allIssues.push(...r3.issues);

  return {
    ...rawScene,
    elements,
    _validation: {
      issues: allIssues,
      fixedCount: allIssues.filter((i) => i.fixed).length,
    },
  };
}
