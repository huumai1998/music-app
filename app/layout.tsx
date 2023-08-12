import Sidebar from '@/components/Sidebar'
import './main.scss'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/supaBaseProvider'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Music App',
  description: 'Listen your music!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <SupabaseProvider> */}
          <Sidebar>
            {children}
          </Sidebar>
        {/* </SupabaseProvider> */}
      </body>
    </html>
  )
}
