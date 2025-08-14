export type SizeId = "S" | "M" | "L";
export type WindowType = "double_hung" | "slider" | "casement" | "picture";
export type GridProfileId = "none" | "std-5-8" | "cont-3-4" | "cont-1";
export type GlazingId = "dual" | "triple";

export type Customer = { name: string; email?: string; phone?: string };

export type QuoteItem = {
  window_type: WindowType;
  size: SizeId;
  qty: number;
  exterior_color: string;
  interior_color: string;
  grid_profile: GridProfileId;
  grid_pattern: string;    // "None" | "Colonial" | "Prairie" | "Craftsman"
  obscure_glass: string;   // "None" | ...
  glazing: GlazingId;
  cavity_foam: boolean;
  unit_price: number;
  line_total: number;
};

export type Quote = {
  id: string;
  createdAt: string;
  customer: Customer;
  items: QuoteItem[];
  subtotal: number;
  total: number;
  metadata?: Record<string, any>;
};

export type NewQuotePayload = {
  customer: Customer;
  items: QuoteItem[];
  subtotal: number;
  total: number;
  metadata?: Record<string, any>;
};

export interface QuoteStore {
  listQuotes(): Promise<Quote[]>;
  getQuote(id: string): Promise<Quote | null>;
  saveQuote(input: NewQuotePayload): Promise<Quote>;
}
