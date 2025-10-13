import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ status: "ok" }, { status: 200 });
}

type ExtractRequest = {
    url: string;
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as ExtractRequest;

        if (!body?.url) {
            return NextResponse.json({ error: "Missing 'url' in request body" }, { status: 400 })
        }

        // Mock extraction
        const u = new URL(body.url);
        const programName = u.hostname.replace(/^www\./, "");

        const mock = {
            name: programName,
            url: body.url,
            deadline: "2025-12-01",
            commitment: "12 weeks",
            notes: "Mock data from /api/extract",
        };
        return NextResponse.json(mock, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: "Invalid JSON body or bad URL" },
            { status: 400 }
        );
    }
}