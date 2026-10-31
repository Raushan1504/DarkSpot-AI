import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "DarkSpot AI | Epistemic Information Gap & Contradiction Auditor",
  description:
    "AI-Assisted Information Gap Detection Platform auditing scattered online sources for high-stakes decisions (Shinchan Online Hackathon 2026).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200 font-sans">
        {children}
        <Toaster richColors position="top-right" theme="dark" />
      </body>
    </html>
  );
}
