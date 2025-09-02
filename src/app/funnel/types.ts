// =============================================
// File: app/funnel/types.ts
// =============================================
export type LeadPayload = {
  zip: string
  city: string
  state: string
  issues: string[]
  features: string[]
  seriesPreference: string
  styles: string[]
  frameColor: string
  frameColorThumb?: string
  grids: 'Yes' | 'No'
  windowsCount: number
  sizeMix: 'Small' | 'Medium' | 'Large'
  wantsAdProgram: boolean
  // NEW: granular quantities per style
  styleQuantities?: Record<string, number>
  fullName: string
  email: string
  phone?: string
  bestTime: 'Morning' | 'Evening'
}