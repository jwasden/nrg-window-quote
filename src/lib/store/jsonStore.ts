import { promises as fs } from "fs";
import path from "path";
import { QuoteStore, Quote, NewQuotePayload } from "./types";

const isVercel = !!process.env.VERCEL;
// use /tmp on Vercel to prevent EROFS; NOT durable
const DATA_DIR = isVercel ? "/tmp" : path.join(process.cwd(), "data");
const QUOTES_PATH = path.join(DATA_DIR, "quotes.json");

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(QUOTES_PATH);
  } catch {
    await fs.writeFile(QUOTES_PATH, "[]", "utf8");
  }
}

async function readAll(): Promise<Quote[]> {
  await ensureFile();
  const raw = await fs.readFile(QUOTES_PATH, "utf8");
  return JSON.parse(raw) as Quote[];
}

async function writeAll(quotes: Quote[]) {
  const tmp = QUOTES_PATH + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(quotes, null, 2), "utf8");
  await fs.rename(tmp, QUOTES_PATH);
}

export function jsonStore(): QuoteStore {
  return {
    async listQuotes() {
      const q = await readAll();
      // newest first
      return q.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    },
    async getQuote(id) {
      const q = await readAll();
      return q.find(x => x.id === id) ?? null;
    },
    async saveQuote(input: NewQuotePayload) {
      const q = await readAll();
      const record: Quote = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...input
      };
      q.push(record);
      await writeAll(q);
      return record;
    }
  };
}
