// =============================================
// File: app/funnel/steps/QuizStep.tsx (UPDATED with style thumbnails)
// =============================================
'use client'
import { useState } from 'react'
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
const COLORS = ['White', 'Almond', 'Black', 'Bronze', 'Desert Clay', 'Silver']
// TODO: we need to add a thumbnail swatch to the dropdown that visually indicates what color is being selected 
const COLOR_VALUES = ['#ffffff', '#d6d3c4', '#000000', '#363229', '#ccc0aa', '#8c9091']
// Styles with thumbnail images (served from /public/images)
const STYLE_OPTIONS: { label: string; img?: string }[] = [
  { label: '2-Light Slider', img: '/images/two-light-slider.jpg' },
  { label: '3-Light Slider', img: '/images/triple-light-slider.jpg' },
  { label: 'Double-Hung', img: '/images/double-hung.jpg' },
  { label: 'Picture', img: '/images/picture-window.jpg' },
  { label: 'Single Slider', img: '/images/single-light-slider.jpg' },
  { label: 'Single Hung', img: '/images/single-hung.jpg' },
  { label: 'Sliding Glass Door', img: '/images/sliding-glass-door.jpg' },
  { label: 'Specialty/Shapes' }, // no image provided
]

export function QuizStep({ data, onBack, onNext }: { data: LeadPayload, onBack: () => void, onNext: (partial: Partial<LeadPayload>) => void }) {
  const [local, setLocal] = useState({
    issues: data.issues,
    features: data.features,
    seriesPreference: data.seriesPreference,
    styles: data.styles,
    frameColor: data.frameColor,
    grids: data.grids,
    windowsCount: data.windowsCount,
    sizeMix: data.sizeMix,
  })

  function toggle<T extends string>(arr: T[], value: T) {
    return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext(local as any)
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

      {/* Series & Color */}
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
          <select
            value={local.frameColor}
            onChange={(e) => setLocal(prev => ({ ...prev, frameColor: e.target.value }))}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          >
            <option value="">Select</option>
            {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Styles with thumbnails */}
      <div>
        <label className="block text-sm font-medium mb-2">Window styles</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STYLE_OPTIONS.map(({ label, img }) => (
            <button
              key={label}
              type="button"
              onClick={() => setLocal(prev => ({ ...prev, styles: toggle(prev.styles, label) }))}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left ${local.styles.includes(label) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}
            >
              <span className="flex-1">{label}</span>
              {img && (
                <img
                  src={img}
                  alt={label}
                  className="h-12 w-20 object-cover rounded-md hidden sm:block"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Counts / size / grids */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">How many windows?</label>
          <input
            type="number"
            min={1}
            max={50}
            value={local.windowsCount}
            onChange={(e) => setLocal(prev => ({ ...prev, windowsCount: Number(e.target.value) }))}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>
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
          <p className="mt-2 text-xs text-gray-500">Why we ask: size affects price range.</p>
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