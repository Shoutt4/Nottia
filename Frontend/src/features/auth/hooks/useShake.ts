import { useCallback, useRef } from 'react'

/**
 * Sacude un elemento con la Web Animations API (sin CSS extra).
 * Se ignora si el usuario pidió reducir el movimiento.
 */
export function useShake<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  const shake = useCallback(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    node.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-7px)' },
        { transform: 'translateX(6px)' },
        { transform: 'translateX(-4px)' },
        { transform: 'translateX(3px)' },
        { transform: 'translateX(0)' },
      ],
      { duration: 380, easing: 'ease-in-out' },
    )
  }, [])

  return { ref, shake }
}
