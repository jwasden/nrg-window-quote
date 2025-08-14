import Link from "next/link";

async function getQuotes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/quotes`, { cache: "no-store" });
  // In dev, NEXT_PUBLIC_BASE_URL can be empty and Next will resolve relative path
  if (!res.ok) throw new Error("Failed to load quotes");
  return res.json();
}

export default async function AdminQuotesPage() {
  const quotes = await getQuotes();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Quotes</h1>
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-right">Items</th>
              <th className="px-4 py-2 text-right">Total</th>
              <th className="px-4 py-2 text-right">PDF</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q: any) => (
              <tr key={q.id} className="border-t">
                <td className="px-4 py-2">{new Date(q.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{q.customer?.name}</td>
                <td className="px-4 py-2 text-right">{q.items?.length ?? 0}</td>
                <td className="px-4 py-2 text-right">${Number(q.total).toFixed(2)}</td>
                <td className="px-4 py-2 text-right">
                  <Link href={`/api/quotes/${q.id}/pdf`} className="text-emerald-700 underline">Download</Link>
                </td>
              </tr>
            ))}
            {quotes.length === 0 && (
              <tr><td className="px-4 py-8 text-center text-slate-500" colSpan={5}>No quotes yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
