import { HomeIcon, NotebookIcon, UserIcon } from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'

import type { NavItem } from '../types'

/** Enlaces del menú lateral. Agrega aquí nuevas secciones. */
export const navItems: NavItem[] = [
  { to: ROUTES.dashboard, label: 'Inicio', Icon: HomeIcon },
  { to: ROUTES.notebooks, label: 'Cuadernos', Icon: NotebookIcon },
  { to: ROUTES.profile, label: 'Perfil', Icon: UserIcon },
]
