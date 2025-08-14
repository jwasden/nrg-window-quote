"use client";
import { useMemo, useState } from "react";
//import catalog from "@/../data/catalog.json";
import catalog from "./../data/catalog.json";
// import { priceItem, allowedInteriorForExterior } from "@/lib/pricing";
import { priceItem, allowedInteriorForExterior } from "./../lib/pricing"; 
import type { SizeId, WindowType, GridProfileId, GlazingId } from "./../lib/store/types";
//import type { SizeId, WindowType, GridProfileId, GlazingId } from "@/lib/store/types";

type LineItemInput = {
  window_type: WindowType;
  size: SizeId;
  qty: number;
  exterior_color: string;
  interior_color: string;
  grid_profile: GridProfileId;
  grid_pattern: string;
  obscure_glass: string;
  glazing: GlazingId;
  cavity_foam: boolean;
};

const emptyItem: LineItemInput = {
  window_type: "double_hung",
  size: "M",
  qty: 1,
  exterior_color: "White",
  interior_color: "White",
  grid_profile: "none",
  grid_pattern: "None",
  obscure_glass: "None",
  glazing: "dual",
  cavity_foam: false
};

export default function Page() {
  const [item, setItem] = useState<LineItemInput>(emptyItem);
  const [items, setItems] = useState<any[]>([]);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  const allowedInterior = useMemo(
    () => allowedInteriorForExterior(item.exterior_color),
    [item.exterior_color]
  );

  const totals = useMemo(() => {
    const lines = items.map((it) => priceItem(it));
    const subtotal = lines.reduce((s, l) => s + l.line, 0);
    const total = subtotal;
    return { subtotal, total };
  }, [items]);

  const addItem = () => {
    if (!allowedInterior.includes(item.interior_color)) {
      setItem({ ...item, interior_color: allowedInterior[0] });
      return;
    }
    setItems([...items, item]);
    setItem(emptyItem);
  };

  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  const submitQuote = async () => {
    setSaving(true);
    setSavedId(null);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items,
          metadata: { source: "online-configurator" }
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setSavedId(data.id);
      setItems([]);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">NRG Window Quote</h1>
          <p className="text-sm text-slate-600">MVP for window catalog & pricing lead generation.</p>
          <a className="text-sm text-slate-600 hover:underline text-blue-500" target="_self" href={`http://${window.location.host}/admin/quotes`}>Download quotes</a>
          <a href={`${window.location.host}/admin/quote`} />
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl bg-white p-4 shadow">
            <h2 className="mb-3 text-lg font-medium">Configure a window</h2>

            <div className="grid grid-cols-2 gap-3">
              {/* Window Type */}
              <label className="flex flex-col gap-1">
                <span className="text-xs text-slate-600">Type</span>
                <select
                  className="rounded-lg border p-2"
                  value={item.window_type}
                  onChange={(e) => setItem({ ...item, window_type: e.target.value as WindowType })}
                >
                  <option value="double_hung">Double-Hung</option>
                  <option value="slider">Slider</option>
                  <option value="casement">Casement</option>
                  <option value="picture">Picture</option>
                </select>
              </label>

              {/* Size */}
              <label className="flex flex-col gap-1">
                <span className="text-xs text-slate-600">Size</span>
                <select
                  className="rounded-lg border p-2"
                  value={item.size}
                  onChange={(e) => setItem({ ...item, size: e.target.value as SizeId })}
                >
                  {catalog.sizePresets.map((s: any) => (
                    <option key={s.id} value={s.id}>
                      {s.label} — {s.widthIn}"×{s.heightIn}"
                    </option>
                  ))}
                </select>
              </label>

              {/* Quantity */}
              <label className="flex flex-col gap-1">
                <span className="text-xs text-slate-600">Quantity</span>
                <input
                  type="number"
                  min={1}
                  className="rounded-lg border p-2"
                  value={item.qty}
                  onChange={(e) => setItem({ ...item, qty: Math.max(1, Number(e.target.value || 1)) })}
                />
              </label>

              {/* Exterior Color */}
              <label className="flex flex-col gap-1">
                <span className="text-xs text-slate-600">Exterior Color</span>
                <select
                  className="rounded-lg border p-2"
                  value={item.exterior_color}
                  onChange={(e) => setItem({ ...item, exterior_color: e.target.value })}
                >
                  {catalog.exteriorColors.map((c: string) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              {/* Interior Color */}
              <label className="flex flex-col gap-1">
                <span className="text-xs text-slate-600">Interior Color</span>
                <select
                  className="rounded-lg border p-2"
                  value={allowedInterior.includes(item.interior_color) ? item.interior_color : allowedInterior[0]}
                  onChange={(e) => setItem({ ...item, interior_color: e.target.value })}
                >
                  {allowedInterior.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-500">
                  Dark exteriors (Black/Bronze/Silver) pair with White/Almond interior only.
                </span>
              </label>

              {/* Grid */}
              <label className="flex flex-col gap-1">
                <span className="text-xs text-slate-600">Grid Profile</span>
                <select
                  className="rounded-lg border p-2"
                  value={item.grid_profile}
                  onChange={(e) => setItem({ ...item, grid_profile: e.target.value as GridProfileId })}
                >
                  <option value="none">None</option>
                  {catalog.gridProfiles.map((g: any) => (
                    <option key={g.id} value={g.id}>{g.label}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs text-slate-600">Grid Pattern</span>
                <select
                  className="rounded-lg border p-2"
                  value={item.grid_pattern}
                  onChange={(e) => setItem({ ...item, grid_pattern: e.target.value })}
                >
                  <option>None</option>
                  {catalog.gridPatterns.map((p: string) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </label>

              {/* Glass */}
              <label className="flex flex-col gap-1">
                <span className="text-xs text-slate-600">Obscure Glass</span>
                <select
                  className="rounded-lg border p-2"
                  value={item.obscure_glass}
                  onChange={(e) => setItem({ ...item, obscure_glass: e.target.value })}
                >
                  {catalog.obscureGlass.map((g: string) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs text-slate-600">Glazing</span>
                <select
                  className="rounded-lg border p-2"
                  value={item.glazing}
                  onChange={(e) => setItem({ ...item, glazing: e.target.value as GlazingId })}
                >
                  <option value="dual">Dual Pane</option>
                  <option value="triple">Triple Pane</option>
                </select>
              </label>

              {/* Foam */}
              <label className="col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.cavity_foam}
                  onChange={(e) => setItem({ ...item, cavity_foam: e.target.checked })}
                />
                <span className="text-sm">Enhanced Cavity Foam</span>
              </label>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={addItem} className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90">Add to quote</button>
              <button onClick={() => setItem(emptyItem)} className="rounded-xl border px-4 py-2">Reset</button>
            </div>
          </div>

          {/* Cart */}
          <div className="rounded-2xl bg-white p-4 shadow">
            <h2 className="mb-3 text-lg font-medium">Quote</h2>
            <ul className="space-y-3">
              {items.map((it, i) => {
                const { unit, line } = priceItem(it);
                return (
                  <li key={i} className="rounded-lg border p-3">
                    <div className="flex justify-between">
                      <div className="font-medium">
                        {it.qty}× {it.window_type} {it.size} — {it.exterior_color}/{it.interior_color}
                      </div>
                      <div>${line.toFixed(2)}</div>
                    </div>
                    <div className="text-xs text-slate-600">
                      {it.grid_profile !== "none" ? `${it.grid_pattern} • ` : ""}
                      {it.glazing === "triple" ? "Triple Pane • " : "Dual Pane • "}
                      {it.obscure_glass !== "None" ? `${it.obscure_glass} • ` : ""}
                      {it.cavity_foam ? "Foam" : ""}
                    </div>
                    <div className="text-[11px] text-slate-500">Unit: ${unit.toFixed(2)}</div>
                    <button onClick={() => removeItem(i)} className="mt-2 text-xs text-rose-600 underline">Remove</button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 border-t pt-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
            </div>

            <div className="mt-4 space-y-2">
              <input placeholder="Name" className="w-full rounded-lg border p-2" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })}/>
              <input placeholder="Email" className="w-full rounded-lg border p-2" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })}/>
              <input placeholder="Phone" className="w-full rounded-lg border p-2" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}/>
              <button
                disabled={!customer.name || items.length === 0 || saving}
                onClick={submitQuote}
                className="w-full rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white enabled:hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Quote"}
              </button>
              {savedId && <p className="text-xs text-emerald-700">Saved! Quote ID: {savedId}</p>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
