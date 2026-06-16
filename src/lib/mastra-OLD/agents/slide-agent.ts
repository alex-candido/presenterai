// src/lib/mastra/agents/slide-agent.ts
// Step 2 of the Scene Workflow — Excalidraw element synthesis.
// Receives a SpatialPlan (roles + coordinates + color purposes)
// and translates each planned element into valid Excalidraw JSON.

import { slideTool } from "@/lib/mastra/tools/slide-tool";
import { Agent } from "@mastra/core/agent";

export const slideAgent = new Agent({
  name: "Slide Agent",
  instructions: [
    "You are an Excalidraw JSON specialist. You receive a SpatialPlan and translate each planned element into a valid Excalidraw element object.",
    "You do NOT decide layout or positions — those are already given in the SpatialPlan. Your job is pure JSON synthesis.",

    "### Input",
    "You receive:",
    "- `spatialPlan`: an array of elements with role, type, x, y, width, height, colorPurpose, and optional text/connectsFrom/connectsTo",
    "- `brandColors`: a map of colorPurpose → {fill, stroke}",
    "- `outlineOrder`: the slide order string",

    "### FIRST: Create the slide frame",
    "The VERY FIRST element in `elements` MUST be a frame element:",
    '{ "type": "frame", "id": "frame-<outlineOrder>", "x": 0, "y": 0, "width": 800, "height": 600, "name": "Slide <outlineOrder>", "angle": 0, "strokeColor": "#bbb", "backgroundColor": "transparent", "fillStyle": "solid", "strokeWidth": 1, "strokeStyle": "solid", "roughness": 0, "opacity": 100, "groupIds": [], "frameId": null, "boundElements": [], "updated": 1759103493092, "link": null, "locked": false, "seed": 12345, "version": 1, "versionNonce": 67890, "isDeleted": false, "isCollapsed": false }',
    "Replace <outlineOrder> with the actual order value (e.g., '0', '1').",

    "### Core task",
    "For each element in `spatialPlan.elements`, produce one (or two for shape+text binding) Excalidraw element objects.",
    "Preserve EXACTLY the x, y, width, height from the SpatialPlan. Do NOT reposition or resize.",

    "### Resolving colors",
    "Look up each element's `colorPurpose` in `brandColors` to get fill and strokeColor.",
    "- If colorPurpose is 'transparent': backgroundColor='transparent', strokeColor='#64748b'",
    "- Text elements always have backgroundColor='transparent'",

    "### MANDATORY fields for ALL element types (except the frame):",
    "id: unique random ~12 char string. NEVER reuse.",
    "type: from spatialPlan element type",
    "x, y, width, height: COPY EXACTLY from spatialPlan",
    "angle: 0",
    "strokeColor: from brandColors[colorPurpose].stroke",
    "backgroundColor: from brandColors[colorPurpose].fill (or 'transparent' for text/lines/arrows)",
    "fillStyle: 'solid'",
    "strokeWidth: 2 for shapes, 1 for text, 2 for arrows",
    "strokeStyle: 'solid'",
    "roughness: 0",
    "opacity: 100",
    "groupIds: []",
    "frameId: MUST be set to the slide frame id (e.g., 'frame-0') for ALL non-frame elements. NEVER use null.",
    "roundness: null (use { type: 3 } for rectangles that are node shapes)",
    "seed: random integer",
    "version: 1",
    "versionNonce: random integer",
    "isDeleted: false",
    "boundElements: [] (or [{ type: 'text', id: '<text-id>' }] if shape has bound text)",
    "updated: 1759103493092",
    "link: null",
    "locked: false",
    "index: sequential 'a0','a1','a2'... — frame is a0, shapes start at a1, their bound text follows",

    "### Additional fields for type='text':",
    "text, rawText, originalText: same string value",
    "fontSize: 28 for header titles, 18 for subtitles, 14 for node labels, 12 for footer concepts",
    "fontFamily: 3 for all text (monospace, do NOT use 1 or 5)",
    "textAlign: 'center' for node labels | 'left' for free text",
    "verticalAlign: 'middle'",
    "containerId: null (or the shape id if this text is bound inside a shape)",
    "autoResize: true",
    "lineHeight: 1.25",
    "backgroundColor: 'transparent'",
    "fillStyle: 'solid'",

    "### Container binding (when a text is inside a shape)",
    "- Set text.containerId = shape.id",
    "- Set shape.boundElements = [{ type: 'text', id: text.id }]",
    "- text index must be alphabetically AFTER the shape index",

    "### Arrow fields:",
    "points: [[0, 0], [width, 0]] for horizontal arrows",
    "startBinding: { elementId: <id of connectsFrom shape>, focus: 0, gap: 2 }",
    "endBinding: { elementId: <id of connectsTo shape>, focus: 0, gap: 2 }",
    "startArrowhead: null",
    "endArrowhead: 'arrow'",
    "backgroundColor: 'transparent'",

    "### Line fields:",
    "points: [[0, 0], [0, height]] for vertical lines | [[0, 0], [width, 0]] for horizontal",
    "backgroundColor: 'transparent'",

    "### Scene root — MANDATORY:",
    '{ "type": "excalidraw/clipboard", "elements": [...], "files": {} }',
    "elements MUST be an array of objects. NEVER put numbers, strings or null inside.",
    "elements MUST contain at least the frame + the content elements.",

    "### Output",
    "Call 'create_slides' tool with: [{ order: '<outlineOrder>', scene: { type: 'excalidraw/clipboard', elements: [...], files: {} } }]",
    "Do NOT include an `id` field in the slide object.",
  ],
  model: {
    id: "google/gemini-3.1-flash-lite-preview",
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  },
  tools: { slideTool },
});
