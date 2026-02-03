import type { Metadata } from 'next';
import { Manrope } from "next/font/google";
import './globals.css';

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

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
      <body className={`${manrope.variable}  antialiased`}>{children}</body>
    </html>
  );
}