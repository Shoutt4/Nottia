import {
  CalendarIcon,
  KanbanIcon,
  ListIcon,
  MapIcon,
  NoteIcon,
} from '@/components/ui/icons'

import type { QuickAction } from './types'

export const quickActions: QuickAction[] = [
  {
    id: 'notas',
    title: 'Notas',
    description: 'Captura ideas y apuntes con formato, etiquetas y colores.',
    Icon: NoteIcon,
    iconClass: 'text-accent',
    tintClass: 'bg-accent-soft',
  },
  {
    id: 'listas',
    title: 'Listas',
    description: 'Organiza pendientes con recordatorios y subtareas.',
    Icon: ListIcon,
    iconClass: 'text-accent-2',
    tintClass: 'bg-accent-2/10',
  },
  {
    id: 'calendario',
    title: 'Calendario',
    description: 'Ve tus fechas y eventos importantes de un vistazo.',
    Icon: CalendarIcon,
    iconClass: 'text-accent',
    tintClass: 'bg-accent-soft',
  },
  {
    id: 'kanban',
    title: 'Kanban',
    description: 'Mueve tareas entre columnas y sigue tu progreso.',
    Icon: KanbanIcon,
    iconClass: 'text-danger',
    tintClass: 'bg-danger-soft',
  },
  {
    id: 'mapa',
    title: 'Mapa',
    description: 'Guarda lugares y recuérdalos donde los necesitas.',
    Icon: MapIcon,
    iconClass: 'text-accent-2',
    tintClass: 'bg-accent-2/10',
  },
]
