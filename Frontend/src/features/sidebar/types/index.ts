import type { ComponentType } from 'react'

import type { IconProps } from '@/components/ui/icons'

/** Un enlace del menú lateral. */
export interface NavItem {
  /** Ruta destino (usar `ROUTES`). */
  to: string
  /** Etiqueta visible; también se muestra como tooltip al contraer. */
  label: string
  /** Ícono de `@/components/ui/icons`. */
  Icon: ComponentType<IconProps>
}
