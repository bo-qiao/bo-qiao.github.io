import type { Metadata } from "next";
import "./globals.css";
import "./hf0.css";

export const metadata: Metadata = {
  title: "HF0 — Hacker Fellowship Zero",
  description:
    "A 12-week residency in San Francisco for repeat founders and technical builders.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
