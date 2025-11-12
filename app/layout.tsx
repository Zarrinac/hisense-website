import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'New Zarrinac Website',
  description: 'Zarrinac next generation website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
