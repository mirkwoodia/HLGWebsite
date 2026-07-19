import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Holy Land Goods | Palestinian Extra Virgin Olive Oil',
  description:
    'Single-source Palestinian extra virgin olive oil, cold-pressed and raw from 2,000-year-old Nabali and Rumi groves. 318mg/kg polyphenols. Now on Amazon.',
  metadataBase: new URL('https://shopholylandgoods.com'),
  openGraph: {
    title: 'Holy Land Goods | Palestinian Extra Virgin Olive Oil',
    description:
      'Single-source, raw & unfiltered Palestinian olive oil from 2,000-year-old groves. 3x the polyphenols of ordinary olive oil.',
    url: 'https://shopholylandgoods.com',
    siteName: 'Holy Land Goods',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
