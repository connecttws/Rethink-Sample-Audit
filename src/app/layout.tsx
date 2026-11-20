import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Rethink Sample Audits · Business, Fitness & Nutrition Diagnostics",
  description:
    "Interactive client demonstration suite featuring Business Growth Audit, 1-on-1 Fitness Diagnostic, and Clinical Nutrition Audit with instant WhatsApp report generation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-950 selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
