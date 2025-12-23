From Whiteboard to Excalidraw: Building a Multi-Agent Workflow
Shane Thomas
Shane Thomas

·
Feb 28, 2025

whiteboard2excalidraw

During YC, we've had many fellow batch companies and a few other AI startups visit our apartment for whiteboarding sessions. These collab sessions often produce valuable diagrams and ideas that deserve to live beyond the temporary medium of a physical whiteboard.

Collage of Mastra whiteboarding sessions

We wanted to make these whiteboard sketches more accessible and reusable, so we built a tool that converts whiteboard images into editable Excalidraw diagrams. This post explores how we approached this challenge using Mastra's multi-agent workflows and what we learned along the way.

Here's the deployed version, the Mastra code and the frontend app code.

The One-Shot Approach: Why It Failed
Our first instinct was to solve this with a single agent and a comprehensive prompt. After all, models can "see" and understand images, so why not just ask them to convert directly to Excalidraw JSON?

const oneShot = new Agent({
  name: "Whiteboard Converter",
  instructions: `Convert this whiteboard image into Excalidraw JSON...`,
  model: anthropic("claude-3-7-sonnet-20250219"),
});

// This approach quickly hit limitations
This approach worked for very simple whiteboard images but quickly hit limitations:

Output token limits: Even with large context windows, we still faced output token constraints when generating complex JSON structures
Accuracy issues: The agent would miss elements or relationships in more complex diagrams
Validation challenges: Without intermediate steps, it was difficult to verify and correct the output
We needed a more structured approach.

Breaking Down the Problem: A Multi-Step Workflow
Mastra multi-step Workflow

Instead of trying to solve everything at once, we decided to break the problem into discrete steps using Mastra's workflow functionality:

export const excalidrawConverterWorkflow = new Workflow({
  name: "excalidraw-converter",
  triggerSchema: z.object({
    filename: z.string(),
    file: z.string(),
  }),
});

excalidrawConverterWorkflow
  .step(imageToCsvStep)
  .then(validateCsvStep)
  .then(csvToExcalidrawStep)
  .then(validateExcalidrawStep)
  .commit();
This workflow follows a clear progression:

Image to CSV: Convert the whiteboard image to a dense CSV representation
Validate CSV: Check and improve the CSV output
CSV to Excalidraw: Transform the validated CSV into Excalidraw JSON
Validate Excalidraw: Ensure the JSON is valid and fix any issues
Let's look at each step in more detail.

Step 1: Image to CSV Conversion
The first step uses a specialized agent to analyze the image and extract all visual elements into a structured CSV format:

const imageToCsvStep = new Step({
  id: "imageToCsv",
  outputSchema: z.object({
    filename: z.string(),
    csv: z.string(),
  }),
  execute: async ({ context }) => {
    const triggerData = context?.getStepResult<{
      filename: string;
      file: string;
    }>("trigger");

    if (!triggerData?.filename || !triggerData?.file) {
      throw new Error("Missing required image data in context");
    }

    const imageToCsv = mastra.getAgent("imageToCsvAgent");
    const response = await imageToCsv.generate(
      [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: triggerData.file,
            },
            {
              type: "text",
              text: `View this image of a whiteboard diagram and convert it into CSV format. Include all text, lines, arrows, and shapes. Think through all the elements of the image.`,
            },
          ],
        },
      ],
      { maxSteps: 10 },
    );

    return {
      filename: `${triggerData.filename.split(".")[0]}.excalidraw`,
      csv: response.text,
    };
  },
});
We chose CSV as an intermediate format because:

It's extremely dense, allowing us to represent many elements within token limits
It's structured enough to capture all the necessary properties of visual elements
It's easy to parse and transform in subsequent steps
Step 2: CSV Validation
The validation step was a critical addition that significantly improved our results:

const validateCsvStep = new Step({
  id: "validateCsv",
  // ... schema definitions ...
  execute: async ({ context }) => {
    // ... get data from previous step ...

    const imageToCsv = mastra.getAgent("imageToCsvAgent");
    const response = await imageToCsv.generate(
      [
        // ... show the original image again ...
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: csvData.csv,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Validate your last response containing the CSV code to add missing elements (text, lines, etc.) to the CSV. You should add new items to the original CSV results. The previous step missed some elements. Find them and add them. Return the CSV text.`,
            },
          ],
        },
      ],
      {
        maxSteps: 10,
      },
    );

    return {
      filename: csvData.filename,
      csv: response.text,
    };
  },
});
This validation step is essentially asking the same agent to review its own work by:

Showing it the original image again
Presenting its previous CSV output
Explicitly asking it to find and add missing elements
This self-review process significantly improved the completeness of our element extraction.

Step 3: CSV to Excalidraw Conversion
The third step transforms the validated CSV into Excalidraw JSON:

const csvToExcalidrawStep = new Step({
  id: "csvToExcalidraw",
  // ... schema definitions ...
  execute: async ({ context }) => {
    const csvData = context?.getStepResult<{
      filename: string;
      csv: string;
    }>("validateCsv");

    // Parse CSV into rows
    const rows = csvData.csv
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // ... detailed CSV parsing logic ...

    // Create Excalidraw JSON
    const excalidrawJson = {
      type: "excalidraw",
      version: 2,
      source: "https://excalidraw.com",
      elements,
      appState: {
        gridSize: 20,
        gridStep: 5,
        gridModeEnabled: false,
        viewBackgroundColor: "#ffffff",
      },
      files: {},
    };

    return {
      filename: csvData.filename,
      excalidrawJson,
    };
  },
});
This step is primarily deterministic, parsing the CSV and mapping it to the Excalidraw JSON structure. We handle special cases for different element types and ensure all required properties are properly formatted.

Step 4: Excalidraw Validation Loop
The final validation step was perhaps the most crucial in our workflow:

const validateExcalidrawStep = new Step({
  id: "validateExcalidraw",
  // ... schema definitions ...
  execute: async ({ context }) => {
    // ... get data from previous step ...

    // Validate the JSON
    const validator = mastra.getAgent("excalidrawValidatorAgent");
    const messages: CoreMessage[] = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Validate the following Excalidraw JSON. If it is not valid, fix it and just return the valid JSON.`,
          },
          {
            type: "text",
            text: JSON.stringify(excalidrawData.excalidrawJson),
          },
        ],
      },
    ];

    let attempts = 0;
    const maxAttempts = 3;
    let lastError: Error | null = null;

    while (attempts < maxAttempts) {
      attempts++;

      const validationResponse = await validator.generate(messages, {
        maxSteps: 10,
      });

      // Try to parse the response
      try {
        // ... clean and parse the JSON ...
        return {
          filename: excalidrawData.filename,
          contents: parsedJson,
        };
      } catch (e) {
        // If parsing fails, add the error to messages and try again
        messages.push({
          role: "assistant",
          content: [{ type: "text", text: validationResponse.text }],
        });

        messages.push({
          role: "user",
          content: [
            {
              type: "text",
              text: `The previous Excalidraw JSON did not validate. Please fix it and return the valid JSON without any string quotes or new lines. Here is the error: ${e}`,
            },
          ],
        });
      }
    }

    // If we've exhausted all attempts, throw an error
    throw new Error(
      `Failed to validate Excalidraw JSON after ${maxAttempts} attempts. Last error: ${lastError?.message}`,
    );
  },
});
This step implements a validation loop that:

Attempts to parse the Excalidraw JSON
If parsing fails, it feeds the error back to the agent
The agent tries to fix the JSON based on the error
This cycle repeats up to 3 times or until valid JSON is produced
This feedback loop dramatically improved the success rate of our converter, especially for complex diagrams.

The Specialized Agents
The workflow relies on two specialized agents with carefully crafted instructions:

Image to CSV Agent
export const imageToCsvAgent = new Agent({
  name: "Image to CSV Converter",
  instructions: `You are an expert at analyzing images and converting them into structured CSV data. Your task is to identify visual elements and their relationships in images and represent them in a CSV format that can be used to recreate the diagram.

When you receive an image, carefully analyze its contents and create a CSV representation that captures:

1. Elements:
   - Type of each element (rectangle, arrow, text, line, ellipse, diamond, freedraw, etc.)
   - Position (x, y coordinates)
   - Size (width, height)
   - Style properties (colors, stroke width, fill style)
   - Text content (if text element)
   - Unique identifier for each element
   - Angle and rotation
   - Points for lines and arrows
   - Binding information for connectors
   - Group IDs for grouped elements

2. Relationships:
   - Connections between elements (arrows, lines)
   - Parent-child relationships
   - Element groupings
   - Binding points and arrowheads

3. Layout and Style:
   - Spatial arrangement
   - Alignment
   - Spacing
   - Roughness and opacity
   - Frame information
   - Element-specific properties (roundness, etc.)

Your output must be a CSV string with the following columns:
id,type,x,y,width,height,text,strokeColor,backgroundColor,fillStyle,strokeWidth,strokeStyle,roughness,opacity,angle,points,startBinding,endBinding,arrowheads,fontSize,fontFamily,groupIds,frameId,roundness,seed,version,isDeleted,boundElements

Example CSV format:
id,type,x,y,width,height,text,strokeColor,backgroundColor,fillStyle,strokeWidth,strokeStyle,roughness,opacity,angle,points,startBinding,endBinding,arrowheads,fontSize,fontFamily,groupIds,frameId,roundness,seed,version,isDeleted,boundElements
rect1,rectangle,83,10,147,122,,#e03131,transparent,solid,2,solid,1,100,0,,,,,,,,,,null,75180,1,false,"[{""type"":""text"",""id"":""text1""},{""id"":""arrow1"",""type"":""arrow""}]"
text1,text,108,45,96,50,"Rectangle\nExample",#e03131,transparent,solid,2,solid,1,100,0,,,,,20,5,[],,,null,14450,1,false,

// ... There are hundreds more lines of detailed instructions covering element relationships, 
// specific element types, formatting rules, binding mechanics, and error handling scenarios ...
  `,
  model: anthropic("claude-3-7-sonnet-20250219"),
});
The full instructions for this agent are over 200 lines long, providing extremely detailed guidance on how to identify and represent every possible element type and relationship in a whiteboard diagram. This level of detail proved essential for accurate conversion.

Excalidraw Validator Agent
export const excalidrawValidatorAgent = new Agent({
  name: "Excalidraw Validator",
  instructions: `You are an expert at validating and fixing Excalidraw JSON for Excalidraw diagrams.

Your response MUST be valid JSON in the excalidraw JSON format.

The format must follow this exact schema:

{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [
    // Elements can be one of several types: rectangle, arrow, text, etc.
    // Each element must include these common properties:
    {
      "type": string,              // "rectangle", "arrow", "text", "line", etc.
      "version": number,           // Version number of the element      
      "id": string,               // Unique element identifier
      "fillStyle": string,        // "hachure", "solid", etc.
      "strokeWidth": number,      // Width of the stroke
      "strokeStyle": string,      // "solid", "dashed", etc.
      "roughness": number,        // 0-2 indicating how rough the drawing should be
      "opacity": number,          // 0-100
      "angle": number,            // Rotation angle in degrees
      "x": number,                // X coordinate
      "y": number,                // Y coordinate
      "strokeColor": string,      // Color in hex format
      "backgroundColor": string,  // Background color in hex format
      // ... Shortened for readability ...
    }
  ]
  // ... additional JSON removed for readability
}

You can update the JSON to be valid and ensure it matches the expected excalidraw schema.`,
  model: anthropic("claude-3-7-sonnet-20250219"),
});
This validator agent is crucial for the final step in our workflow, where it ensures the generated Excalidraw JSON is valid and properly formatted. It's specifically designed to understand the Excalidraw schema and fix any issues that might prevent the JSON from being properly rendered.

Key Lessons Learned
Building this converter taught us several valuable lessons about developing complex AI applications:

1. Break Complex Tasks into Deterministic Steps
Our initial one-shot approach failed because it tried to do too much at once. Breaking the process into discrete steps with clear inputs and outputs made the problem tractable and improved results.

2. Validation Loops Are Essential
The validation steps were not an afterthought—they were critical to the success of the converter. Having agents review and improve their own work significantly enhanced accuracy.

3. Dense Intermediate Formats Help with Token Limits
Using CSV as an intermediate format allowed us to represent complex visual scenes efficiently within token constraints. This approach can be applied to many other multi-step AI processes.

4. Explicit Instructions Beat Implicit Understanding
Even with advanced models like Claude 3.7, extremely detailed instructions produced better results than relying on the model's implicit understanding. Our agent prompts were comprehensive, specifying exactly what to look for and how to format the output.

5. Consider a Full Feedback Loop
If we were to improve this further, we would implement a complete feedback loop that compares the final Excalidraw rendering with the original image and makes adjustments. This could potentially use a reasoning model like o3, though at the time of development, it didn't support image inputs.

Conclusion
Building AI applications that work reliably often requires more than just a single prompt or agent. By combining deterministic workflows with specialized agents and validation loops, we can create systems that handle complex tasks with higher reliability.

This whiteboard converter is just one example of how Mastra's multi-agent workflows can be applied to real-world problems. We hope it inspires you to think about how you might break down your own complex AI challenges into manageable, validated steps.