# NRG Window Quote — Next.js + Vercel Postgres

JSON‑driven options, per‑type pricing, quotes saved to Vercel Postgres, and per‑quote PDF export.

## Quick start

```bash
npx create-next-app@latest nrg-window-quote --ts --app --tailwind
cd nrg-window-quote
npm i @vercel/postgres zod @react-pdf/renderer
# copy files from this repo starter
cp .env.example .env.local # set POSTGRES_URL
npm run dev