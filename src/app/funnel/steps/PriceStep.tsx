// =============================================
// File: app/funnel/steps/PriceStep.tsx (UPDATED pricing by style * size)
// =============================================
'use client'
import type { LeadPayload } from '../types'

const BASE_BY_STYLE: Record<string, number> = {
  '2-Light Slider': 1100,
  '3-Light Slider': 1300,
  'Double-Hung': 1000,
  'Picture': 900,
  'Single Slider': 1000,
  'Single Hung': 950,
  'Sliding Glass Door': 2500,
  'Specialty/Shapes': 1400,
}

const SIZE_MULTIPLIER = { Small: 1.0, Medium: 1.3, Large: 1.6 } as const

function estimateFromQuantities(styleQuantities: Record<string, number> = {}, size: 'Small'|'Medium'|'Large') {
  const m = SIZE_MULTIPLIER[size]
  let subtotal = 0
  for (const [style, qty] of Object.entries(styleQuantities)) {
    const base = BASE_BY_STYLE[style] || 1000
    subtotal += (qty || 0) * base * m
  }
  // provide a conservative range (±15%)
  const min = Math.round(subtotal * 0.85)
  const max = Math.round(subtotal * 1.15)
  return [min, max] as const
}

export function PriceStep({ data }: { data: LeadPayload }) {
  const [min, max] = estimateFromQuantities(data.styleQuantities || {}, data.sizeMix)
  const totalQty = Object.values(data.styleQuantities || {}).reduce((a, b) => a + (b || 0), 0) || Math.max(1, data.windowsCount || 0)
  const perWindow = Math.round(((min + max) / 2) / Math.max(1, totalQty))
  const adMin = Math.round(min * 0.5)
  const adMax = Math.round(max * 0.5)

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold">Your Retail Price Range</h2>
        <p className="text-sm text-gray-600">Based on your selections ({totalQty} window{totalQty!==1?'s':''}, size: {data.sizeMix}), your project would typically cost ${min.toLocaleString()} – ${max.toLocaleString()} at standard retail rates (~${perWindow.toLocaleString()} per window).</p>
      </header>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="font-medium">You may qualify for our Advertising Home Program (limited availability this month).</p>
        <p className="text-sm text-emerald-900 mt-1">That could place your total around ${adMin.toLocaleString()} – ${adMax.toLocaleString()}.</p>
      </div>

      <div className="text-xs text-gray-500">
        Estimated ranges shown; final pricing confirmed on your callback.
      </div>
    </div>
  )
}