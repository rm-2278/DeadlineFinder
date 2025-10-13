import { NextResponse } from "next/server";
import { processWithGemini } from "../../../lib/geminiModel";

type ExtractRequest = {
    url: string;
}

export async function POST(req: Request) {
    try {
        // Parse and validate request body
        const body = (await req.json()) as ExtractRequest;
        if (!body?.url) {
            return NextResponse.json({ error: "Missing 'url' in request body" }, { status: 400 })
        }

        // Step 1: Fetch website content
        const websiteResponse = await fetch(body.url);
        if (!websiteResponse.ok) {
            throw new Error(`Failed to fetch website content: ${websiteResponse.status}`);
        }
        const websiteContent = await websiteResponse.text();

        // Step 2: Process content with Gemini
        const geminiData = await processWithGemini(websiteContent);

        // Step 3: Return Gemini's response
        return NextResponse.json(geminiData, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "An unexpected error occurred" },
            { status: 500 }
        );
    }
}