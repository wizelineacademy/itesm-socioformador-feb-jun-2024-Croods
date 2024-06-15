import type { Metadata } from "next"
import OverflowHiddenBody from "@/components/OverflowHiddenBody"

export const metadata: Metadata = {
  title: "KnowX - History",
  description: "Your search history.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <OverflowHiddenBody>{children}</OverflowHiddenBody>
    </html>
  )
}
