// =============================================
// File: app/funnel/progress-bar.tsx
// =============================================
'use client'
export function ProgressBar({ value }: { value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-emerald-500 transition-[width] duration-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}