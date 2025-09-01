// =============================================
// File: app/funnel/page.tsx (Multi-step sales funnel)
// =============================================
'use client'
import { useState, useMemo } from 'react'
import { ProgressBar } from './progress-bar'
import { ZipStep } from './steps/ZipStep'
import { QuizStep } from './steps/QuizStep'
import { CaptureStep } from './steps/CaptureStep'
import { PriceStep } from './steps/PriceStep'
import type { LeadPayload } from './types'

export default function FunnelPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<LeadPayload>({
    zip: '',
    city: '',
    state: '',
    issues: [],
    features: [],
    seriesPreference: '',
    styles: [],
    frameColor: '',
    grids: 'No',
    windowsCount: 0,
    sizeMix: 'Small',
    wantsAdProgram: false,
    fullName: '',
    email: '',
    phone: '',
    bestTime: 'Morning',
  })

  const totalSteps = 4 // Zip -> Quiz -> Capture -> Price
  const progress = useMemo(() => Math.round(((step + 1) / totalSteps) * 100), [step])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <ProgressBar value={progress} />
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          {step === 0 && (
            <ZipStep
              data={data}
              onNext={(partial) => {
                setData(prev => ({ ...prev, ...partial }))
                setStep(1)
              }}
            />
          )}
          {step === 1 && (
            <QuizStep
              data={data}
              onBack={() => setStep(0)}
              onNext={(partial) => {
                setData(prev => ({ ...prev, ...partial }))
                setStep(2)
              }}
            />
          )}
          {step === 2 && (
            <CaptureStep
              data={data}
              onBack={() => setStep(1)}
              onNext={async (partial) => {
                const merged = { ...data, ...partial }
                setData(merged)
                // Send lead to API
                try {
                  const res = await fetch('/api/lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(merged),
                  })
                  if (!res.ok) throw new Error('Failed to submit lead')
                } catch (e) {
                  console.error(e)
                }
                setStep(3)
              }}
            />
          )}
          {step === 3 && (
            <PriceStep data={data} />
          )}
        </div>
      </div>
    </main>
  )
}