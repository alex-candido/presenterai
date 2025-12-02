
import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not set in environment variables.");
}

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Classifies the user's prompt into a specific diagram type using the Gemini API.
 * @param userPrompt The text prompt from the user.
 * @returns The classified diagram type (e.g., 'flowchart', 'sequence diagram').
 */
export async function classifyPrompt(userPrompt: string): Promise<string> {
  const systemPrompt = `
    You are an expert at understanding diagram descriptions.
    Your task is to classify the user's request into one of the following diagram types:

    - flowchart
    - sequence diagram
    - mind map
    - database schema
    - class diagram
    - use case diagram
    - gantt chart
    - venn diagram
    - org chart
    - timeline
    - generic

    If the user explicitly mentions a diagram type in their prompt, you should use that type.

    Analyze the user's prompt and respond with ONLY ONE of the types from the list above.
    For example, if the user says "I want to show how a user logs in, checks their dashboard, and logs out", you should respond with "flowchart".
  `;

  try {
    const result = await model.generateContent([systemPrompt, userPrompt]);
    const classification = result.response.text().trim().toLowerCase();
    return classification;
  } catch (error) {
    console.error("Error classifying prompt:", error);
    // In case of an error, we can default to 'generic' or handle it as needed.
    return "generic";
  }
}
