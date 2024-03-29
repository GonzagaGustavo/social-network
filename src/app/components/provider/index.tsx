'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Theme } from '@radix-ui/themes'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <Theme>{children}</Theme>
      </ThemeProvider>
    </SessionProvider>
  )
}
