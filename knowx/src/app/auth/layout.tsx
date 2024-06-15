import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KnowX - Sign in",
  description: "Sign in to KnowX to access your dashboard.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}