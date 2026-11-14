import { CalendarIcon, HomeIcon, NotebookIcon, UserIcon, UsersIcon } from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'

import type { NavItem } from '../types'

/** Enlaces del menú lateral. Agrega aquí nuevas secciones. */
export const navItems: NavItem[] = [
  { to: ROUTES.dashboard, label: 'Inicio', Icon: HomeIcon },
  { to: ROUTES.notebooks, label: 'Cuadernos', Icon: NotebookIcon },
  { to: ROUTES.activities, label: 'Actividades', Icon: CalendarIcon },
  { to: ROUTES.profile, label: 'Perfil', Icon: UserIcon },
]

/** Navegación propia del panel de administración. */
export const adminNavItems: NavItem[] = [
  { to: ROUTES.adminUsers, label: 'Usuarios', Icon: UsersIcon },
  { to: ROUTES.adminProfile, label: 'Perfil', Icon: UserIcon },
]
