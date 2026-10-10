import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OmniForge AI",
  description: "Multi-platform content creation and brand intelligence.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
