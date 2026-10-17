import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'

import type { NavItem } from '../types'

interface SidebarNavItemProps {
  item: NavItem
  collapsed: boolean
  /** Posición en la lista, para escalonar la animación de entrada. */
  index?: number
  onNavigate?: () => void
}

/** Enlace del sidebar: barra activa animada, ícono con escala y tooltip al contraer. */
export function SidebarNavItem({ item, collapsed, index = 0, onNavigate }: SidebarNavItemProps) {
  const { to, label, Icon } = item

  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      style={{ animationDelay: `${index * 60}ms` }}
      className={({ isActive }) =>
        cn(
          'group relative flex animate-rise items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 motion-reduce:animate-none',
          isActive ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-canvas hover:text-ink',
          collapsed && 'lg:justify-center lg:px-0',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            aria-hidden
            className={cn(
              'absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent transition-opacity duration-300',
              isActive ? 'opacity-100' : 'opacity-0',
            )}
          />

          <Icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none" />

          <span className={cn('truncate', collapsed && 'lg:hidden')}>{label}</span>

          {collapsed && (
            <span className="pointer-events-none absolute left-full z-50 ml-3 hidden whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium text-canvas opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
              {label}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}
