// =============================================
// File: app/funnel/steps/CaptureStep.tsx
// =============================================
'use client'
import { useState } from 'react'
import type { LeadPayload } from '../types'

export function CaptureStep({ data, onBack, onNext }: { data: LeadPayload, onBack: () => void, onNext: (partial: Partial<LeadPayload>) => void }) {
  const [local, setLocal] = useState({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone || '',
    bestTime: data.bestTime,
    wantsAdProgram: data.wantsAdProgram,
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!local.fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(local.email)) return
    if (local.wantsAdProgram && !/\d{10}/.test(local.phone.replace(/\D/g, ''))) return
    onNext(local as any)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold">We’ve calculated your retail price range</h2>
        <p className="text-sm text-gray-600">Enter your details to receive results. Check below if you want to see if you qualify for up to 50% off.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full name</label>
          <input value={local.fullName} onChange={(e) => setLocal(prev => ({...prev, fullName: e.target.value}))} className="w-full rounded-xl border border-gray-300 px-4 py-3" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" value={local.email} onChange={(e) => setLocal(prev => ({...prev, email: e.target.value}))} className="w-full rounded-xl border border-gray-300 px-4 py-3" required />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input id="adprogram" type="checkbox" checked={local.wantsAdProgram} onChange={(e) => setLocal(prev => ({...prev, wantsAdProgram: e.target.checked}))} />
        <label htmlFor="adprogram" className="text-sm">Yes, see if I qualify for the Advertising Home Program (up to 50% off)</label>
      </div>

      {local.wantsAdProgram && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Mobile phone</label>
            <input value={local.phone} onChange={(e) => setLocal(prev => ({...prev, phone: e.target.value}))} placeholder="(555) 555-5555" className="w-full rounded-xl border border-gray-300 px-4 py-3" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Best time to contact</label>
            <select value={local.bestTime} onChange={(e) => setLocal(prev => ({...prev, bestTime: e.target.value as any}))} className="w-full rounded-xl border border-gray-300 px-4 py-3">
              <option>Morning</option>
              <option>Evening</option>
            </select>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500">
        <label className="inline-flex items-start gap-2">
          <input type="checkbox" required />
          <span>I agree to be sent information and contacted by NRG Windows.</span>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} className="rounded-xl border border-gray-300 px-6 py-3">Back</button>
        <button type="submit" className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700">Get My Price</button>
      </div>
    </form>
  )
}