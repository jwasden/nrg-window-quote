import { NextResponse } from "next/server";
import { getQuoteStore } from "./../../../../../lib/store/quoteStore";
import { QuotePDF } from "./../../../../../lib/pdf";
// import { getQuoteStore } from "@/lib/store/quoteStore";
// import { QuotePDF } from "@/lib/pdf";
import { renderToStream } from "@react-pdf/renderer";

export const runtime = "nodejs";

export async function GET(_: Request, ctx: { params: { id: string } }) {
  const store = getQuoteStore();
  const quote = await store.getQuote(ctx.params.id);
  if (!quote) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const stream = await renderToStream(QuotePDF({ quote }));
  return new NextResponse(stream as any, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="quote-${quote.id}.pdf"`
    }
  });
}
