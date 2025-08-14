import { QuoteStore, NewQuotePayload, Quote } from "./types";

export function neonStore(): QuoteStore {
  // Implement with @neondatabase/serverless or Prisma/Drizzle later.
  return {
    async listQuotes(): Promise<Quote[]> {
      throw new Error("Neon store not implemented yet");
    },
    async getQuote(_: string): Promise<Quote | null> {
      throw new Error("Neon store not implemented yet");
    },
    async saveQuote(_: NewQuotePayload): Promise<Quote> {
      throw new Error("Neon store not implemented yet");
    }
  };
}
