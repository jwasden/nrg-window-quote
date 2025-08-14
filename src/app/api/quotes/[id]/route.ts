import { NextResponse } from "next/server";
import { getQuoteStore } from "./../../../../lib/store/quoteStore";
//import { getQuoteStore } from "@/lib/store/quoteStore";

export const runtime = "nodejs";

export async function GET(_: Request, ctx: { params: { id: string } }) {
  const store = getQuoteStore();
  const quote = await store.getQuote(ctx.params.id);
  if (!quote) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(quote);
}
