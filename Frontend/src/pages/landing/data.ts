import type { ComponentType } from 'react'

import { CalendarIcon, KanbanIcon, ListIcon, MapIcon, NoteIcon } from '@/components/ui/icons'
import type { IconProps } from '@/components/ui/icons'

export interface Feature {
  id: string
  title: string
  description: string
  action: string
  Icon: ComponentType<IconProps>
  /** Color del ícono (token de papel). */
  iconClass: string
  /** Fondo del recuadro del ícono. */
  tintClass: string
}

export const features: Feature[] = [
  {
    id: 'notas',
    title: 'Notas',
    description: 'Escribe ideas, apuntes y listas con formato, etiquetas y contraseñas.',
    action: 'Empezar ahora',
    Icon: NoteIcon,
    iconClass: 'text-paper-accent',
    tintClass: 'bg-paper-accent/10',
  },
  {
    id: 'listas',
    title: 'Listas',
    description: 'Convierte cualquier nota en listas interactivas con recordatorios.',
    action: 'Empezar ahora',
    Icon: ListIcon,
    iconClass: 'text-paper-accent',
    tintClass: 'bg-paper-accent/10',
  },
  {
    id: 'mapa',
    title: 'Mapa',
    description: 'Guarda lugares y recuérdalos justo donde los necesitas.',
    action: 'Explorar ahora',
    Icon: MapIcon,
    iconClass: 'text-paper-accent',
    tintClass: 'bg-paper-accent/10',
  },
  {
    id: 'kanban',
    title: 'Kanban',
    description: 'Organiza el trabajo en tableros y mueve tareas entre columnas.',
    action: 'Explorar ahora',
    Icon: KanbanIcon,
    iconClass: 'text-paper-accent',
    tintClass: 'bg-paper-accent/10',
  },
  {
    id: 'calendario',
    title: 'Calendario',
    description: 'Visualiza fechas, eventos y recordatorios de un vistazo.',
    action: 'Explorar ahora',
    Icon: CalendarIcon,
    iconClass: 'text-paper-accent',
    tintClass: 'bg-paper-accent/10',
  },
]
