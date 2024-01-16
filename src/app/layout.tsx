import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import DashboardLayout from '@/layouts/DashboardLayout'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  )
}
