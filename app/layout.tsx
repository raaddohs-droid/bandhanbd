import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: 'Biye Kori - বিয়ে করি | 100% Verified Matrimony Bangladesh',
  description: 'Bangladesh most trusted matrimony site. 100% NID verified profiles, no ghotok fees. Find Muslim brides and grooms in Dhaka, Chittagong, Sylhet. Free forever.',
  keywords: ['biye kori', 'বিয়ে করি', 'bangladesh matrimony', 'muslim matrimony', 'dhaka matrimony', 'verified profiles', 'no ghotok fees', 'ঘটক', 'পাত্র পাত্রী'],
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: 'https://www.biyekori.com',
    siteName: 'Biye Kori Matrimony',
    title: 'Biye Kori - Bangladesh #1 Verified Matrimony',
    description: '100% NID verified Muslim matrimony. No ghotok fees. 10000+ families trust us.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}