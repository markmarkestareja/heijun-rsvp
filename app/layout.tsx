import type { Metadata } from "next";
import { Archivo, Great_Vibes } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
})


export const metadata: Metadata = {
  title: "Heijun Hotel Supply & General Merchandise",
  description: "Heijun RSVP for Product Presentation 2026",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
