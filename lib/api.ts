// Create type for table rows
export type Row = {
  name: string;
  url: string;
  deadline: string;
  commitment: string;
  notes: string;
};

export async function extract(imageUrl: string): Promise<Row> {
    const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl }),
    });

    // try to parse json, fallbacks to empty object
    const data = await res.json().catch(() => ({})) as Record<string, unknown>;

    if (!res.ok) {
        throw new Error(String(data?.error ?? data.message ?? `Request failed: ${res.status}`));
    }

    return data as Row;
}