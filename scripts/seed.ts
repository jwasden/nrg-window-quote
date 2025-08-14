import { jsonStore } from "./../src/lib/store/jsonStore";
import { QuoteItem } from "./../src/lib/store/types";
import { priceItem } from "./../src/lib/pricing";

// import { jsonStore } from "@/lib/store/jsonStore";
// import { QuoteItem } from "@/lib/store/types";
// import { priceItem } from "@/lib/pricing";

async function main() {
  const store = jsonStore();

  const items: Omit<QuoteItem,"unit_price"|"line_total">[] = [
    {
      window_type: "double_hung", size: "M", qty: 3,
      exterior_color: "White", interior_color: "White",
      grid_profile: "std-5-8", grid_pattern: "Colonial",
      obscure_glass: "None", glazing: "dual", cavity_foam: false
    },
    {
      window_type: "casement", size: "L", qty: 1,
      exterior_color: "Black", interior_color: "Almond",
      grid_profile: "none", grid_pattern: "None",
      obscure_glass: "Satin Etched", glazing: "triple", cavity_foam: true
    }
  ];

  const priced = items.map((it) => {
    const { unit, line } = priceItem(it);
    return { ...it, unit_price: unit, line_total: line };
  });

  const subtotal = priced.reduce((s, it) => s + it.line_total, 0);
  const total = subtotal;

  await store.saveQuote({
    customer: { name: "Jane Homeowner", email: "jane@example.com", phone: "555-0000" },
    items: priced,
    subtotal,
    total,
    metadata: { seeded: true }
  });

  console.log("Seeded 1 quote into data/quotes.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
