import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IITM BS CGPA Calculator',
  description: 'Calculate and predict your CGPA for IIT Madras BS in Data Science and BS in Electronic Systems programs.',
  keywords: 'CGPA calculator, IIT Madras, BS Data Science, BS Electronic Systems, IITMBS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
