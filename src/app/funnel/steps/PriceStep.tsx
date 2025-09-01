// =============================================
// File: app/funnel/steps/PriceStep.tsx
// =============================================
'use client'
import type { LeadPayload } from '../types'

function estimateRange({ windowsCount, sizeMix }: { windowsCount: number, sizeMix: 'Small'|'Medium'|'Large' }) {
  // Very simple heuristic per-window retail cost
  const base = sizeMix === 'Small' ? 1000 : sizeMix === 'Medium' ? 3000 : 4500
  const min = Math.max(1, windowsCount) * base
  const max = Math.max(1, windowsCount) * Math.round(base * 1.3)
  return [min, max]
}

export function PriceStep({ data }: { data: LeadPayload }) {
  const [min, max] = estimateRange({ windowsCount: data.windowsCount, sizeMix: data.sizeMix })
  const adMin = Math.round(min * 0.5)
  const adMax = Math.round(max * 0.5)

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold">Your Retail Price Range</h2>
        <p className="text-sm text-gray-600">Based on your inputs, your project would typically cost ${min.toLocaleString()} – ${max.toLocaleString()} at standard retail rates.</p>
      </header>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="font-medium">You may qualify for our Advertising Home Program (limited availability this month).</p>
        <p className="text-sm text-emerald-900 mt-1">Many customers in your area pay as little as ${(adMin/Math.max(1, data.windowsCount)).toLocaleString()} per window with this program, which means your cost could be as low as ${adMin.toLocaleString()} – ${adMax.toLocaleString()}.</p>
      </div>

      <div>
        <p className="text-sm text-gray-600">An NRG specialist will contact you shortly to review your estimate and discuss .</p>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a href={process.env.NEXT_PUBLIC_SCHEDULER_RETAIL_URL || '#'} className="rounded-xl bg-gray-900 px-6 py-3 text-center font-medium text-white hover:bg-black">Check My Eligibility for Retail Price</a>
        <a href={process.env.NEXT_PUBLIC_SCHEDULER_AD_URL || '#'} className="rounded-xl bg-emerald-600 px-6 py-3 text-center font-medium text-white hover:bg-emerald-700">Check My Eligibility for Advertising Price</a>
      </div> */}

      {/* <p className="text-xs text-gray-500">We’ll also text/email your quote if you opted in.</p> */}
    </div>
  )
}