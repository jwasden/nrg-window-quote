import { QuoteStore } from "./types";
import { jsonStore } from "./jsonStore";
// import { jsonStore } from "./jsonStore";
// Future: import { neonStore } from "./neonStore";

export function getQuoteStore(): QuoteStore {
  // flip this switch later (env var, config flag, etc.)
  // if (process.env.DB_URL) return neonStore();
  return jsonStore();
}
