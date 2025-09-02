// =============================================
// File: app/api/lead/route.ts (Serverless email sender via Resend)
// =============================================
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
//import recipientsConfig from '@/config/leadTargets.json'
import recipientsConfig from './../../../config/leadTargets.json'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    const resend = new Resend(process.env.RESEND_API_KEY)
    if (!resend) return NextResponse.json({ error: 'Resend not configured' }, { status: 500 })

    const recipients = (recipientsConfig?.recipients ?? []) as string[]
    if (!recipients.length) return NextResponse.json({ error: 'No recipients configured' }, { status: 500 })

    const subject = `NEW WINDOW LEAD: ${payload.fullName || 'Unknown'} (${payload.zip || 'no-zip'})`

    const lines: string[] = [
      `Zip: ${payload.zip} (${payload.state})`,
      `Issues: ${(payload.issues||[]).join(', ')}`,
      `Features: ${(payload.features||[]).join(', ')}`,
      `Series: ${payload.seriesPreference}`,
      `Styles: ${(payload.styles||[]).join(', ')}`,
      `Frame Color: ${payload.frameColor} | Grids: ${payload.grids}`,
      `Windows: ${payload.windowsCount} | Size Mix: ${payload.sizeMix}`,
      `Ad Program: ${payload.wantsAdProgram ? 'Yes' : 'No'}`,
      `Name: ${payload.fullName} | Email: ${payload.email} | Phone: ${payload.phone || 'N/A'}`,
      `Best Time: ${payload.bestTime}`,
      `Frame Color: ${payload.frameColor} | Grids: ${payload.grids}`,
      payload.frameColorThumb ? `Color Thumb: ${payload.frameColorThumb}` : undefined,
      `Style Quantities: ${JSON.stringify(payload.styleQuantities || {})}`,
    ].filter(Boolean) as string[]

    const html = `
      <h2>New Window Lead</h2>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      <pre style="font-size:14px;line-height:1.5;background:#f8fafc;padding:12px;border-radius:12px;border:1px solid #e2e8f0;">${lines.join('\n')}</pre>
    `

    const { error } = await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL || 'NRG Windows <leads@noreply.nrgwindows.com>',
      to: recipients,
      subject,
      html,
    })
    if (error) return NextResponse.json({ error }, { status: 500 })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}