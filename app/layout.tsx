import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/* Body copy, labels, buttons */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* Headings and large figures */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myfnpf.com.fj"),
  title: {
    default: "Fiji National Provident Fund | New & Existing Members",
    template: "%s | Fiji National Provident Fund",
  },
  description:
    "New to FNPF or already a member? Choose your path to registration, benefits, withdrawals, statements and myFNPF services.",
  openGraph: { siteName: "Fiji National Provident Fund", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}