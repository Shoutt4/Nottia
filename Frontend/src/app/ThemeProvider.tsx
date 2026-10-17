import { useEffect } from 'react'
import type { ReactNode } from 'react'

import { useUiStore } from '@/stores/uiStore'

/**
 * Refleja el tema del store en la clase `.dark` de `<html>`.
 * Los tokens de `styles/index.css` se redefinen bajo esa clase, así que el
 * resto de la UI no necesita estilos `dark:` propios.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useUiStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return <>{children}</>
}
