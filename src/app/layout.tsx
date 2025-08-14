import "./globals.css";
import { ReactNode } from "react";

export const metadata = { title: "NRG Window Quote", description: "Mezzo-inspired window quotes" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}