import catalog from "./../data/catalog.json";
//import catalog from "@/../data/catalog.json";
import priceCfg from "./../data/prices.json";
import { QuoteItem, WindowType, SizeId } from "./store/types";

type PriceableInput = Omit<QuoteItem, "unit_price"|"line_total">;

export function priceItem(it: PriceableInput) {
  const base =
    (priceCfg.base as Record<WindowType, Record<SizeId, number>>)[it.window_type][it.size];

  const colorPct = (priceCfg.exteriorColorUpchargePct as Record<string, number>)[it.exterior_color] ?? 0;
  const gridAdd = (priceCfg.gridProfileAdd as Record<string, number>)[it.grid_profile]
                + ((priceCfg.gridPatternAdd as Record<string, number>)[it.grid_pattern] ?? 0);
  const glazeAdd = (priceCfg.glazingAdd as Record<string, number>)[it.glazing] ?? 0;
  const obscureAdd = (priceCfg.obscureGlassAdd as Record<string, number>)[it.obscure_glass] ?? 0;
  const upgrades = it.cavity_foam ? (priceCfg.upgradesAdd as any).cavityFoam : 0;

  const unit = Math.round((base * (1 + colorPct) + gridAdd + glazeAdd + obscureAdd + upgrades) * 100) / 100;
  return { unit, line: Math.round(unit * it.qty * 100) / 100 };
}

// Constraint helper (dark exteriors → White/Almond interior only)
export function allowedInteriorForExterior(exterior: string): string[] {
  const restricted = new Set(catalog.notes.exteriorInteriorConstraint);
  const isRestricted = restricted.has(exterior);
  return isRestricted ? catalog.notes.exteriorInteriorConstraintInteriorAllowed : catalog.interiorColors;
}
