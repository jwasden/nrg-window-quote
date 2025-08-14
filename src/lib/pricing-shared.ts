// import catalog from "../data/catalog.json" assert { type: "json" };
// import prices from "../data/prices.json" assert { type: "json" };
// import type { LineItem } from "./types";

// export type PricedLine = {
//   unit: number;
//   line: number;
// };

// export function priceItem(it: LineItem): PricedLine {
//   const baseType = prices.baseByType?.[it.type]?.[it.size];
//   if (baseType == null) throw new Error(`No base price for ${it.type}/${it.size}`);

//   const colorPct = prices.exteriorColorUpchargePct[it.exteriorColor] ?? 0;
//   const gridAdd = (prices.gridProfileAdd[it.gridProfile] ?? 0) + (prices.gridPatternAdd[it.gridPattern] ?? 0);
//   const glazeAdd = prices.glazingAdd[it.glazing] ?? 0;
//   const obscureAdd = prices.obscureGlassAdd[it.obscureGlass] ?? 0;
//   const upgrades = it.cavityFoam ? prices.upgradesAdd.cavityFoam : 0;

//   const unitRaw = baseType * (1 + colorPct) + gridAdd + glazeAdd + obscureAdd + upgrades;
//   const unit = Math.round(unitRaw * 100) / 100;
//   const line = Math.round(unit * it.qty * 100) / 100;
//   return { unit, line };
// }

// export function priceItems(items: LineItem[]) {
//   const priced = items.map(priceItem);
//   const subtotal = priced.reduce((s, p) => s + p.line, 0);
//   const total = subtotal; // taxes/fees hook
//   return { priced, subtotal, total };
// }

// export function allowedInteriorForExterior(exterior: string) {
//   const restricted = new Set(catalog.notes.exteriorInteriorConstraint);
//   const isRestricted = restricted.has(exterior);
//   return isRestricted ? catalog.notes.exteriorInteriorConstraintInteriorAllowed : catalog.interiorColors;
// }