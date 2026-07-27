import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Clínica Muzy',
  description: 'Medicina esportiva e saúde — Dr. Paulo Muzy',
}

/**
 * Layout raiz: aplica-se a TODAS as rotas, incluindo /studio.
 * Não inclui Header nem Footer — esses ficam em app/(site)/layout.tsx
 * para não contaminar o Sanity Studio em /studio.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} bg-[--color-background] text-[--color-text-primary] antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
