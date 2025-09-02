// =============================================
// File: app/funnel/steps/ZipStep.tsx
// =============================================
'use client'
import { useState } from 'react'
import type { LeadPayload } from '../types'

function inSouthwest(zip: string) {
  const z3 = parseInt(zip.slice(0, 3), 10)
  // AZ 850–865, UT 840–847, NV 889–898, NM 870–884
  if (z3 >= 850 && z3 <= 865) return { ok: true, state: 'AZ' }
  if (z3 >= 840 && z3 <= 847) return { ok: true, state: 'UT' }
  if (z3 >= 889 && z3 <= 898) return { ok: true, state: 'NV' }
  if (z3 >= 870 && z3 <= 884) return { ok: true, state: 'NM' }
  if (z3 >= 832 && z3 <= 838) return { ok: true, state: 'ID' }
  return { ok: false as const }
}

export function ZipStep({ data, onNext }: { data: LeadPayload, onNext: (partial: Partial<LeadPayload>) => void }) {
  const [zip, setZip] = useState(data.zip)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^\d{5}$/.test(zip)) {
      setError('Please enter a valid 5-digit ZIP code.')
      return
    }
    const res = inSouthwest(zip)
    if (!res.ok) {
      setError('Sorry, we currently serve AZ, UT, ID, NV, and NM only.')
      return
    }
    setError('')
    onNext({ zip, state: (res as any).state })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold">What’s your ZIP code?</h2>
        <p className="text-sm text-gray-600">We create a personalized price for your area.</p>
      </header>
      <div>
        <input
          inputMode="numeric"
          pattern="\d{5}"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Enter ZIP"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <button type="submit" className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700">Get My Price</button>
      <p className="text-xs text-gray-500">Why we ask: pricing varies by service area.</p>
    </form>
  )
}