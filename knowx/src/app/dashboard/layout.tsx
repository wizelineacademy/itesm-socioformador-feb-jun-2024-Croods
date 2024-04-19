import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KnowX - Dashboard",
  description: "Your dashboard for all things KnowX.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}