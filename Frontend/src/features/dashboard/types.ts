import type { ComponentType } from 'react'

import type { IconProps } from '@/components/ui/icons'

/** Acceso rápido mostrado en la bienvenida (aún sin funcionalidad). */
export interface QuickAction {
  id: string
  title: string
  description: string
  Icon: ComponentType<IconProps>
  iconClass: string
  tintClass: string
}
