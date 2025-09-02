// =============================================
// File: app/funnel/steps/QuizStep.tsx (UPDATED with color swatches + per-style qty)
// =============================================
'use client'
import { useState, useMemo } from 'react'
import type { LeadPayload } from '../types'

const ISSUE_OPTIONS = [
  'Drafty or Leaky',
  'Hard to Open/Close',
  'Broken Glass',
  'Noise Reduction',
  'Energy Efficiency',
]

const FEATURE_OPTIONS = [
  'Fast Install (1–3 months)',
  'Energy Star Certified',
  'Premium Aesthetics',
  'Budget-Friendly',
]

const SERIES = ['80-Series', 'Mezzo']

// Styles (match your thumbnails in /public/images)
const STYLE_OPTIONS = [
  { label: '2-Light Slider', img: '/images/two-light-slider.jpg' },
  { label: '3-Light Slider', img: '/images/triple-light-slider.jpg' },
  { label: 'Double-Hung', img: '/images/double-hung.jpg' },
  { label: 'Picture', img: '/images/picture-window.jpg' },
  { label: 'Single Slider', img: '/images/single-light-slider.jpg' },
  { label: 'Single Hung', img: '/images/single-hung.jpg' },
  { label: 'Sliding Glass Door', img: '/images/sliding-glass-door.jpg' },
  { label: 'Specialty/Shapes', img: null },
] as const

// Color swatches (hex for inline circle) + optional thumbnail shown after selection
const COLORS = [
  { name: 'White', hex: '#ffffff', img: '/images/colors/white.jpg' },
  { name: 'Almond', hex: '#E5D9C5', img: '/images/colors/almond.jpg' },
  { name: 'Black', hex: '#111111', img: '/images/colors/black.jpg' },
  { name: 'Bronze', hex: '#4E3B2F', img: '/images/colors/bronze.jpg' },
  { name: 'Desert Clay', hex: '#A78F7A', img: '/images/colors/desert-clay.jpg' },
  { name: 'Silver', hex: '#C0C0C0', img: '/images/colors/silver.jpg' },
] as const

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)) }

export function QuizStep({ data, onBack, onNext }: { data: LeadPayload, onBack: () => void, onNext: (partial: Partial<LeadPayload>) => void }) {
  const [local, setLocal] = useState({
    issues: data.issues || [],
    features: data.features || [],
    seriesPreference: data.seriesPreference || '',
    styles: data.styles || [],
    frameColor: data.frameColor || '',
    frameColorThumb: data.frameColorThumb,
    grids: data.grids || 'No',
    // Per-style quantities
    styleQuantities: { ...(data.styleQuantities || {}) } as Record<string, number>,
    windowsCount: data.windowsCount || 0,
    sizeMix: data.sizeMix || 'Small',
  })

  // Keep `styles` and `windowsCount` in sync with quantities
  const totalWindows = useMemo(() => Object.values(local.styleQuantities).reduce((a, b) => a + (b || 0), 0), [local.styleQuantities])

  function toggle<T extends string>(arr: T[], value: T) {
    return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
  }

  function incStyle(label: string, delta: number) {
    setLocal(prev => {
      const nextQty = clamp((prev.styleQuantities[label] || 0) + delta, 0, 50)
      const next = { ...prev, styleQuantities: { ...prev.styleQuantities, [label]: nextQty } }
      // derive styles list from quantities > 0
      const stylesFromQty = Object.entries(next.styleQuantities).filter(([, q]) => (q || 0) > 0).map(([k]) => k)
      next.styles = stylesFromQty
      next.windowsCount = stylesFromQty.length ? Object.values(next.styleQuantities).reduce((a, b) => a + (b || 0), 0) : 0
      return next
    })
  }

  function handleSelectColor(c: typeof COLORS[number]) {
    setLocal(prev => ({ ...prev, frameColor: c.name, frameColorThumb: c.img }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext({ ...local, windowsCount: totalWindows })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold">Tell us about your windows</h2>

      {/* Issues */}
      <div>
        <label className="block text-sm font-medium mb-2">What issues are you having?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ISSUE_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => setLocal(prev => ({ ...prev, issues: toggle(prev.issues, opt) }))}
              className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left ${local.issues.includes(opt) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}
            >
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium mb-2">Features you’re looking for</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {FEATURE_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => setLocal(prev => ({ ...prev, features: toggle(prev.features, opt) }))}
              className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left ${local.features.includes(opt) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}
            >
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Series & Color with swatches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Series Preference</label>
          <select
            value={local.seriesPreference}
            onChange={(e) => setLocal(prev => ({ ...prev, seriesPreference: e.target.value }))}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          >
            <option value="">Select</option>
            {SERIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Frame color</label>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {COLORS.map(c => (
              <button key={c.name} type="button" onClick={() => handleSelectColor(c)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${local.frameColor === c.name ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}>
                <span className="inline-block h-5 w-5 rounded-full border" style={{ background: c.hex }} />
                <span className="text-sm">{c.name}</span>
              </button>
            ))}
          </div>
          {/* Selected color thumbnail */}
          {local.frameColor && (
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-gray-700">Selected: <strong>{local.frameColor}</strong></span>
              {local.frameColorThumb ? (
                <img src={local.frameColorThumb} alt={local.frameColor} className="h-12 w-20 object-cover rounded-md" loading="lazy" />
              ) : (
                <span className="inline-block h-8 w-12 rounded-md border" style={{ background: COLORS.find(c => c.name === local.frameColor)?.hex }} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Styles with thumbnails + quantity steppers */}
      <div>
        <label className="block text-sm font-medium mb-2">Window styles & quantities</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STYLE_OPTIONS.map(({ label, img }) => {
            const qty = local.styleQuantities[label] || 0
            const selected = qty > 0
            return (
              <div key={label} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${selected ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}>
                <span className="flex-1">{label}</span>
                {img && <img src={img} alt={label} className="h-12 w-20 object-cover rounded-md hidden sm:block" loading="lazy" />}
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => incStyle(label, -1)} className="h-8 w-8 rounded-lg border flex items-center justify-center">−</button>
                  <span className="w-6 text-center text-sm">{qty}</span>
                  <button type="button" onClick={() => incStyle(label, +1)} className="h-8 w-8 rounded-lg border flex items-center justify-center">+</button>
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-2 text-xs text-gray-500">Total windows selected: {totalWindows}</p>
      </div>

      {/* Global size + grids (pricing uses this as multiplier) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Typical size</label>
          <select
            value={local.sizeMix}
            onChange={(e) => setLocal(prev => ({ ...prev, sizeMix: e.target.value as any }))}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          >
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
          <p className="mt-2 text-xs text-gray-500">Affects price per window.</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Grids?</label>
          <select
            value={local.grids}
            onChange={(e) => setLocal(prev => ({ ...prev, grids: e.target.value as any }))}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} className="rounded-xl border border-gray-300 px-6 py-3">Back</button>
        <button type="submit" className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700">Continue</button>
      </div>
    </form>
  )
}