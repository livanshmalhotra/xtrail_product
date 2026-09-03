import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home · Xtrail",
  description:
    "Xtrail helps legacy industrial plants modernize with IIoT, automation and AI-driven operations — audits, retrofits, and predictive analytics.",
  keywords: [
    "industrial ai",
    "iiot",
    "digital transformation",
    "predictive maintenance",
    "automation",
    "smart factory",
  ],
  openGraph: {
    title: "Home · Xtrail",
    description:
      "Xtrail helps legacy industrial plants modernize with IIoT, automation and AI-driven operations — audits, retrofits, and predictive analytics.",
    url: "https://www.xtrail.in",
    siteName: "Xtrail",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#050505] text-white selection:bg-[#00a7e1] selection:text-black">
        {children}
      </body>
    </html>
  );
}
