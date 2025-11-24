import { GenerateContentRequest, GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google AI client
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not set in environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey);

// Use a model that supports JSON mode.
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Generates an Excalidraw JSON structure from a user prompt and a diagram type.
 * @param userPrompt The original text from the user.
 * @param diagramType The classification result (e.g., 'flowchart', 'venn diagram').
 * @returns A string representing the Excalidraw JSON.
 */
export async function generateDiagram(userPrompt: string, diagramType: string): Promise<string> {

  const systemPrompt = `
    You are an expert at creating Excalidraw diagrams.
    Your task is to convert a user's text description into a valid Excalidraw JSON object.
    The user wants to create a "${diagramType}".

    Here is the user's description:
    "${userPrompt}"

    You MUST respond with only a valid JSON object that conforms to the Excalidraw schema.
    Do not include any explanatory text, markdown, or any characters outside of the JSON object.

    Here is a simplified version of the Excalidraw JSON schema you must follow:
    {
      "type": "excalidraw",
      "version": 2,
      "source": "https://wittgenstein.ai",
      "elements": [
        {
          "type": "rectangle" | "ellipse" | "diamond" | "arrow" | "line" | "text",
          "id": "string",
          "x": "number",
          "y": "number",
          "width": "number",
          "height": "number",
          "angle": "number" (default 0),
          "strokeColor": "string" (hex color, e.g., "#000000"),
          "backgroundColor": "string" (hex color, e.g., "#ffffff"),
          "fillStyle": "string" ("hachure" | "solid" | "zigzag"),
          "strokeWidth": "number",
          "strokeStyle": "string" ("solid" | "dashed" | "dotted"),
          "roughness": "number" (0-2),
          "opacity": "number" (0-100),
          "text": "string" (for text elements),
          "fontSize": "number",
          "fontFamily": "number",
          "textAlign": "string" ("left" | "center" | "right"),
          "verticalAlign": "string" ("top" | "middle" | "bottom"),
          "startBinding": { "elementId": "string", "focus": "number", "gap": "number" } (for arrows),
          "endBinding": { "elementId": "string", "focus": "number", "gap": "number" } (for arrows),
          "points": [["number", "number"]] (for arrows/lines)
        }
      ],
      "appState": {
        "viewBackgroundColor": "#ffffff",
        "gridSize": null
      }
    }

    ---
    Aesthetic Guidelines:
    - Color Palette: Use a cohesive and modern color palette. Choose from these colors for strokes and backgrounds: #1f2937 (dark gray), #3b82f6 (blue), #10b981 (green), #ef4444 (red), #f97316 (orange), #6366f1 (indigo). For element backgrounds, you can use lighter shades like #dbeafe (light blue) or #d1fae5 (light green).
    - Element Style: Apply a slight 'roughness' (a value of 0 or 1) to give the diagram a friendly, hand-drawn feel. Keep 'strokeWidth' consistent (a value of 2 is good).
    - Typography: Use fontFamily `1` (Virgil) for a classic hand-drawn look. Ensure text is legible and centered within elements.
    - Layout: Ensure elements are neatly aligned and distributed. There should be ample space between elements to avoid a cluttered look. Don't let elements or arrows overlap.
    ---

    Pay close attention to coordinates (x, y) and dimensions (width, height) to create a well-spaced and visually appealing diagram.
    Ensure that arrow elements are correctly bound to other elements using startBinding and endBinding properties, referencing the correct elementIds.
  `;

  const generationConfig: GenerationConfig = {
    responseMimeType: "application/json",
  };

  const request: GenerateContentRequest = {
    contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
    generationConfig: generationConfig,
  };

  try {
    const result = await model.generateContent(request);
    const jsonResponse = result.response.text();
    return jsonResponse;
  } catch (error) {
    console.error("Error generating diagram:", error);
    throw new Error("Failed to generate diagram from Gemini API.");
  }
}