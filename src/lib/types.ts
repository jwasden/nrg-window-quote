export type SizeId = "S" | "M" | "L";
export type GridProfileId = "none" | "std-5-8" | "cont-3-4" | "cont-1";
export type GlazingId = "dual" | "triple";
export type WindowTypeId = "doubleHung" | "slider" | "casement" | "picture";

export type LineItem = {
  type: WindowTypeId;
  size: SizeId;
  qty: number;
  exteriorColor: string;
  interiorColor: string;
  gridProfile: GridProfileId;
  gridPattern: string | "None";
  obscureGlass: string;
  glazing: GlazingId;
  cavityFoam: boolean;
};

export type CustomerInput = { name: string; email?: string; phone?: string };

export type QuoteInsert = {
  customer: CustomerInput;
  items: LineItem[];
  metadata?: Record<string, any>;
};