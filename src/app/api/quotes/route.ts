import { NextResponse } from "next/server";
import { getQuoteStore } from "./../../../lib/store/quoteStore";
//import { getQuoteStore } from "@/lib/store/quoteStore";
import { priceItem } from "./../../../lib/pricing";
// import { priceItem } from "@/lib/pricing";

export const runtime = "nodejs";

export async function GET() {
  const store = getQuoteStore();
  const quotes = await store.listQuotes();
  return NextResponse.json(quotes);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Light validation & server-side price check
    const pricedItems = (body.items ?? []).map((it: any) => {
      const { unit, line } = priceItem(it);
      return { ...it, unit_price: unit, line_total: line };
    });

    const subtotal = pricedItems.reduce((s: number, it: any) => s + it.line_total, 0);
    const total = subtotal; // tax/fees hook

    const store = getQuoteStore();
    const saved = await store.saveQuote({
      customer: body.customer,
      items: pricedItems,
      subtotal,
      total,
      metadata: body.metadata ?? { source: "online-configurator" }
    });

    return NextResponse.json({ ok: true, id: saved.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
