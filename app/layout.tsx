import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SNT - Building Websites, AI Systems & Automations',
    template: '%s | SNT'
  },
  description: 'SNT builds modern websites with Next.js/React, customized Notion systems with AI automations, and intelligent AI agents/automations.',
  keywords: [
    'web development',
    'Next.js development',
    'React development',
    'Notion systems',
    'AI automations',
    'AI agents',
    'custom Notion',
    'AI workflows',
    'portfolio'
  ],
  authors: [{ name: 'SNT' }],
  creator: 'SNT',
  publisher: 'SNT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sybil-solutions.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sybil Solutions - Digital Innovation & AI Development',
    description: 'Specializing in frontend, backend, AI agent development, and research consulting. Building the future of digital experiences.',
    url: 'https://sybil-solutions.com',
    siteName: 'Sybil Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sybil Solutions - Digital Innovation & AI Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sybil Solutions - Digital Innovation & AI Development',
    description: 'Specializing in frontend, backend, AI agent development, and research consulting.',
    images: ['/og-image.jpg'],
    creator: '@sybilsolutions',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}