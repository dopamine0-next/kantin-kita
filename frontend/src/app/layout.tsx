import type { Metadata } from 'next'
import { Figtree, Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { FloatingCheckoutButton } from '@/components/ui/floating-checkout-button'
import { cn } from '@/lib/utils'

import './globals.css'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Kantin Kita - Premium Food Court App',
  description: 'Nikmati kemudahan memesan makanan di kantin terdekat Anda.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        figtree.variable
      )}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FloatingCheckoutButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
