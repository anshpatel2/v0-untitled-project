import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import StructuredData from "./components/structured-data"

export const metadata = {
  title: "SoleNodes - Premium Minecraft Server Hosting",
  description:
    "Professional Minecraft server hosting with 99.9% uptime guarantee. Affordable plans with high performance, security, and 24/7 support for gamers and communities.",
  keywords: "minecraft server hosting, game server, minecraft hosting, SoleNodes, affordable minecraft server",
  authors: [{ name: "SoleNodes" }],
  creator: "SoleNodes",
  publisher: "SoleNodes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://solenodes.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SoleNodes - Premium Minecraft Server Hosting",
    description: "Professional Minecraft server hosting with 99.9% uptime guarantee.",
    url: "https://solenodes.cloud",
    siteName: "SoleNodes",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SoleNodes Minecraft Server Hosting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoleNodes - Premium Minecraft Server Hosting",
    description: "Professional Minecraft server hosting with 99.9% uptime guarantee.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Cross-browser compatibility */}
        <meta name="theme-color" content="#030315" />
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <StructuredData />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
