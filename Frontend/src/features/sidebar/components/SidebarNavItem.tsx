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

/** Enlace del sidebar: entrada de índice, marca activa y tooltip al contraer. */
export function SidebarNavItem({ item, collapsed, index = 0, onNavigate }: SidebarNavItemProps) {
  const { to, label, Icon } = item
  const number = String(index + 1).padStart(2, '0')

  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      style={{ animationDelay: `${index * 60}ms` }}
      className={({ isActive }) =>
        cn(
          'group relative flex animate-rise items-center gap-2.5 rounded-md px-2.5 py-2.5 text-sm transition-colors duration-200 motion-reduce:animate-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-accent',
          isActive
            ? 'bg-desk/60 text-paper-ink'
            : 'text-paper-muted hover:bg-desk/40 hover:text-paper-ink',
          collapsed && 'lg:justify-center lg:px-0',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            aria-hidden
            className={cn(
              'absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-paper-accent transition-opacity duration-300',
              isActive ? 'opacity-100' : 'opacity-0',
            )}
          />

          <span
            aria-hidden
            className={cn(
              'w-5 shrink-0 font-mono text-[9px] tabular-nums tracking-[0.08em]',
              isActive ? 'text-paper-accent' : 'text-paper-muted/70',
              collapsed && 'lg:hidden',
            )}
          >
            {number}
          </span>

          <Icon
            className={cn(
              'h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none',
              isActive && 'text-paper-accent',
            )}
          />

          <span className={cn('truncate font-serif text-[15px]', collapsed && 'lg:hidden')}>
            {label}
          </span>

          {collapsed && (
            <span className="pointer-events-none absolute left-full z-50 ml-3 hidden whitespace-nowrap rounded-md border border-paper-line/60 bg-paper-ink px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
              {label}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}
