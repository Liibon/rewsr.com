import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Space_Mono, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "rewsr | Connections × Execution",
  description:
    "We see connections others don't—between ideas, technologies, and possibilities—then build the technical implementations that make them real.",
  keywords:
    "enforcement substrate, standards implementation, policy automation, technical research, compliance infrastructure",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceMono.variable} ${inter.variable} font-mono antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange={false}>
          <div className="fixed inset-0 pointer-events-none z-[-1] bg-scanline opacity-5"></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
