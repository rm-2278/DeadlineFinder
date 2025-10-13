// Tell browser to render whole component in the browser, not server
"use client";

import { useState } from "react";
import { extract, type Row } from "../lib/api";

export default function Home() {
  // Track state of url input and table rows
  const [url, setUrl] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <main className="min-h-dvh bg-[--color-background]">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[--color-foreground]">
          Program Extractor
        </h1>
        <p>
          Paste a link. We'll extract the program name, deadline, commitment, and notes.
        </p>

        {/* Handle form submit from frontend to backend */}
        <form onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          if (!url.trim()) return;

          // Set the loading state while we fetch
          setLoading(true);
          try {
            const row = await extract(url);
            setRows((prev) => [row, ...prev])    // Add to the top
            setUrl("");                           // clear box
          } catch (err: any) {
            setError(err.message || "Something went wrong");
          } finally {
            // Set loading to false after fetch is done
            setLoading(false);
          }
        }}
        className="mt-6 flex gap-3"
        >
          {/* Create an input box */}
          <input 
            value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a link" 
            className="flex-1 rounded-xl border border-[color-mix(in oklab, var(--color-foreground), transparent 80%)] bg-white/90 px-4 py-2 text-neutral-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* Create the submit button, where if loading is true, disable the button and change text */}
          <button type="submit" disabled={loading}
                  className="rounded-xl px-5 py-2 font-medium text-white shadow-sm
                   disabled:opacity-60 disabled:cursor-not-allowed
                   bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {loading ? "Extracting..." : "Extract"}
          </button>
        </form>
        
        {/* if error is raised, show it in red */}
        {error && (
          <p className="mt-3 text-sm text-red-600">Error: {error}</p>
        )}
      </div>
      
      {/* Display table of the programs available */}
      <div className="mt-8 w-[90%] sm:w-[85%] lg:w-[80%] mx-auto overflow-hidden rounded-2xl border bg-white/90 shadow-sm">
        <table className="min-w-full divide-y divide-[color-mix(in oklab, var(--color-foreground), transparent 88%)]">
          <thead className="bg-[color-mix(in oklab, var(--color-foreground), white 92%)]">
            <tr>
              {["Program Name", "URL", "Deadline", "Commitment", "Notes"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-sm font-semibold text-neutral-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[color-mix(in oklab, var(--color-foreground), transparent 92%)]">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-neutral-50">
                <td className="px-4 py-3 text-sm text-neutral-900 font-medium">
                  {row.name}
                </td>
                <td className="px-4 py-3 text-sm break-words max-w-[200px]">
                  <a href={row.url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline break-all">
                  {row.url}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-neutral-700">{row.deadline}</td>
                <td className="px-4 py-3 text-sm text-neutral-700">{row.commitment}</td>
                <td className="px-4 py-3 text-sm text-neutral-700 break-all">
                  {row.notes}
                </td>
              </tr>
            ))}
            {/* If no programs added yet, display message */}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-neutral-500"
                >
                  No rows yet. Paste a link above to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
