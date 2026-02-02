import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nectar - Save Together, Earn Yield Safely',
  description:
    'Nectar helps communities save together and earn yield safely. The yield is shared based on rules you set while everyone\'s savings remain protected.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-manrope antialiased">{children}</body>
    </html>
  );
}