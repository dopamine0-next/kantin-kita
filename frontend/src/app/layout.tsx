import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { ReactScan } from '@/components/react-scan'
import { ThemeProvider } from '@/components/theme-provider'
import { FloatingCheckoutButton } from '@/components/ui/floating-checkout-button'
import { cn } from '@/lib/utils'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
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
      className={cn('h-full', 'antialiased', poppins.variable)}
    >
      <ReactScan />
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col">
            {children}
            <FloatingCheckoutButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
