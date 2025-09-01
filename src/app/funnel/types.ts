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
  grids: 'Yes' | 'No'
  windowsCount: number
  sizeMix: 'Small' | 'Medium' | 'Large'
  wantsAdProgram: boolean
  fullName: string
  email: string
  phone?: string
  bestTime: 'Morning' | 'Evening'
}