import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import ContextProvider from "@/context";
import Header from "@/components/Header";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nectar - Save Together, Earn Yield Safely",
  description:
    "Nectar helps communities save together and earn yield safely. The yield is shared based on rules you set while everyone's savings remain protected.",
};

const headersObj = await headers();
const cookies = headersObj.get("cookie");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}  antialiased`}>
        <ContextProvider cookies={cookies}>
          <Header />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
