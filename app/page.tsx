// Tell browser to render whole component in the browser, not server
"use client";

import { useState } from "react";

// Create type for table rows
type Row = {
  name: string;
  url: string;
  deadline: string;
  commitment: string;
  notes: string;
};

export default function Home() {
  // Track state of url input and table rows
  const [url, setUrl] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Welcome to Next.js!!!</h1>

      {/* Handle form submit from frontend to backend */}
      <form onSubmit={async (e) => {
        e.preventDefault();
        setError(null);

        if (!url.trim()) return;

        setLoading(true);
        try {
          const res = await fetch("/api/extract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
          });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error || `Request failed: ${res.status}`);
        }

        const data: Row = await res.json();
        setRows((prev) => [data, ...prev])    // Add to the top
        setUrl("");                           // clear box
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
      }}>
        <input 
          value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a link" 
          style={{ marginRight: 8 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Extracting..." : "Extract"}
        </button>
      </form>
      
      {error && (
        <p style={{ color: "crimson", marginTop: 8}}>Error: {error}</p>
      )}

      <p style={{ marginTop: 8 }}>Current URL: {url}</p>

      <table border="1" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Program Name</th>
            <th>URL</th>
            <th>Deadline</th>
            <th>Commitment</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.name}</td>
              <td>
                <a href={row.url} target="_blank" rel="noreferrer">
                {row.url}
                </a>
              </td>
              <td>{row.deadline}</td>
              <td>{row.commitment}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
