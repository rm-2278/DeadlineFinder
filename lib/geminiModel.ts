import { GoogleGenAI, Type } from "@google/genai";
import { Row, RowSchema } from "./row"; // Import Row and RowSchema

// Dynamically generate the response schema for Gemini's config
const responseSchema = Object.fromEntries(
    Object.keys(RowSchema.shape).map((key) => [key, "string"])
);

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY, // Load the API key from environment variables
});

// System instruction for the Gemini model
export const GEMINI_SYSTEM_INSTRUCTION = `
You are a content extraction model. Your job is to analyze the content of a webpage and extract relevant information 
including program name, deadline, commitment, and additional notes. 
The name should be the official program name, the deadline should be in a standard date format (e.g., YYYY-MM-DD),
the commitment should describe the time requirement (e.g., "10 hours per week"), and notes should include any other 
important details about the program within 300 characters.
Ensure the output is structured and concise.
`;

// Function to process content with the Gemini model
export async function processWithGemini(content: string): Promise<Row> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", // Specify the Gemini model version
        contents: content,
        config: { 
            systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema:{
                type: Type.OBJECT,
                properties: {
                    name: {type: Type.STRING},
                    url: {type: Type.STRING},
                    deadline: {type: Type.STRING},
                    commitment: {type: Type.STRING},
                    notes: {type: Type.STRING},
                },
                propertyOrdering: ["name", "url", "deadline", "commitment", "notes"],
                required: ["name", "url", "deadline", "commitment", "notes"],
                additionalProperties: false,
            }, // Dynamically generated response schema
        },
    });

    const result = response.text;

    if (!result) {
        throw new Error("Response text is undefined");
    }

    console.log("Raw response:", result);

    // Validate the response using the schema
    const parsedResult = JSON.parse(result);
    const validatedResult = RowSchema.parse(parsedResult);

    return validatedResult;
}