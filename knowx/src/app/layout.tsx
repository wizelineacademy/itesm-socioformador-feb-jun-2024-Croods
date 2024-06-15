import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getServerSession } from "next-auth"
import SessionProvider from "@/components/SessionProvider"
import { ThemeProvider } from "next-themes"
import OverflowHiddenBody from "@/components/OverflowHiddenBody"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KnowX",
  description: "Knowledge at the speed of thought",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/Logo.svg" />
      </head>
      <OverflowHiddenBody className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" enableSystem>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </OverflowHiddenBody>
    </html>
  )
}
