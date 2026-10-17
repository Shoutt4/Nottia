import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { Toaster } from '@/components/ui/Toaster'

import { queryClient } from './queryClient'
import { ThemeProvider } from './ThemeProvider'

/** Providers globales: tema (claro/oscuro), estado de servidor y avisos. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
