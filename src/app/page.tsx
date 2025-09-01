// =============================================
// File: app/page.tsx (Landing page)
// =============================================
'use client'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Logo from '@/public/NRGLogo.avif'


export default function LandingPage() {
const videoRef = useRef<HTMLVideoElement | null>(null)
useEffect(() => {
if (videoRef.current) videoRef.current.muted = true
}, [])


return (
<main className="min-h-screen bg-gray-950 text-white">
<section className="relative isolate">
<video
ref={videoRef}
className="absolute inset-0 h-full w-full object-cover opacity-40"
autoPlay
loop
muted
playsInline
src="/video/hero-broll.mp4"
/>
<div className="relative mx-auto max-w-5xl px-6 py-28">
<div className="flex items-center gap-4 mb-8">
<Image src={Logo} alt="NRG Windows Logo" width={180} height={60} priority />
</div>
<div className="max-w-2xl">
<h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
Instantly See Your Window Replacement Price
<span className="block text-gray-300 text-2xl mt-3">And find out if you qualify for our Special 50% Off Program.</span>
</h1>
<p className="mt-6 text-gray-300">
(The Advertising Home Program has limited availability this month).
</p>
<div className="mt-8">
<Link href="/funnel" className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-6 py-3 font-medium text-gray-900 shadow-lg shadow-white/10 hover:bg-white">
Start My Price →
</Link>
</div>
{/* Trust bar */}
<div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-200/90">
<div className="flex justify-center items-center rounded-2xl border border-white/10 p-4">★★★★★ Average Rating</div>
<div className="flex justify-center items-center rounded-2xl border border-white/10 p-4">ENERGY STAR® Partner</div>
<div className="flex justify-center items-center rounded-2xl border border-white/10 p-4">True Lifetime Warranty • Install Teams 30+ years of Experience </div>
</div>
</div>
</div>
</section>
</main>
)
}


// =============================================
// Note on video ratio
// =============================================
// For background hero b-roll, the best ratio is 16:9 (standard widescreen).
// That ensures full-bleed coverage across desktops, tablets, and mobile when using object-cover.
// Suggested export: 1920x1080 or 1280x720 (keep file size under ~5–8 MB for fast loading).
// Keep it short (10–20 seconds), looped, muted, compressed (H.264 MP4 or WebM).