import { useCallback, useEffect, useState } from 'react'
import type { RefObject } from 'react'

/**
 * Pantalla completa sobre un elemento (sin salir de la app).
 * Se sincroniza también con Esc, que el navegador gestiona por su cuenta.
 */
export function useFullscreen(ref: RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleChange = () => setIsFullscreen(document.fullscreenElement === ref.current)

    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [ref])

  const toggle = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {})
      return
    }

    await ref.current?.requestFullscreen().catch(() => {})
  }, [ref])

  return { isFullscreen, toggle }
}
