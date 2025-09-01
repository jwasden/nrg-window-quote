// =============================================
// File: app/funnel/steps/QuizStep.tsx
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
const STYLES = ['2-Light Slider', '3-Light Slider', 'Double-Hung', 'Picture', 'Single Slider', 'Single Hung', 'Specialty/Shapes', 'Sliding Glass Door']
const COLORS = ['White', 'Almond', 'Black', 'Bronze', 'Desert Clay', 'Silver']

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext(local as any)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold">Tell us about your windows</h2>

      <div>
        <label className="block text-sm font-medium mb-2">What issues are you having?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ISSUE_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => setLocal(prev => ({
                ...prev,
                issues: prev.issues.includes(opt) ? prev.issues.filter(i => i !== opt) : [...prev.issues, opt]
              }))}
              className={`rounded-xl border px-4 py-3 text-left ${local.issues.includes(opt) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}
            >{opt}</button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Features you’re looking for</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {FEATURE_OPTIONS.map(opt => (
            <button key={opt} type="button" onClick={() => setLocal(prev => ({
              ...prev,
              features: prev.features.includes(opt) ? prev.features.filter(i => i !== opt) : [...prev.features, opt]
            }))} className={`rounded-xl border px-4 py-3 text-left ${local.features.includes(opt) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}>{opt}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Series Preference</label>
          <select value={local.seriesPreference} onChange={(e) => setLocal(prev => ({...prev, seriesPreference: e.target.value}))} className="w-full rounded-xl border border-gray-300 px-4 py-3">
            <option value="">Select</option>
            {SERIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Frame color</label>
          <select value={local.frameColor} onChange={(e) => setLocal(prev => ({...prev, frameColor: e.target.value}))} className="w-full rounded-xl border border-gray-300 px-4 py-3">
            <option value="">Select</option>
            {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Window styles</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STYLES.map(style => (
            <button key={style} type="button" onClick={() => setLocal(prev => ({
              ...prev,
              styles: prev.styles.includes(style) ? prev.styles.filter(i => i !== style) : [...prev.styles, style]
            }))} className={`rounded-xl border px-4 py-3 text-left ${local.styles.includes(style) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}>{style}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">How many windows?</label>
          <input type="number" min={1} max={50} value={local.windowsCount} onChange={(e) => setLocal(prev => ({...prev, windowsCount: Number(e.target.value)}))} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Typical size</label>
          <select value={local.sizeMix} onChange={(e) => setLocal(prev => ({...prev, sizeMix: e.target.value as any}))} className="w-full rounded-xl border border-gray-300 px-4 py-3">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
          <p className="mt-2 text-xs text-gray-500">Why we ask: size affects price range.</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Grids?</label>
          <select value={local.grids} onChange={(e) => setLocal(prev => ({...prev, grids: e.target.value as any}))} className="w-full rounded-xl border border-gray-300 px-4 py-3">
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
