import { Link } from 'react-router-dom'

import { Logo } from '@/components/brand/Logo'
import { ChevronLeftIcon, XIcon } from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'
import { cn } from '@/lib/utils'

import { useSidebar } from '../hooks/useSidebar'
import { navItems } from '../lib/navItems'
import { SidebarNavItem } from './SidebarNavItem'
import { SidebarThemeToggle } from './SidebarThemeToggle'
import { SidebarUser } from './SidebarUser'

interface SidebarProps {
  /** Drawer móvil abierto. */
  mobileOpen: boolean
  onCloseMobile: () => void
}

/**
 * Menú lateral de la zona privada. En escritorio se contrae a un rail de íconos
 * (estado en `uiStore`); en móvil es un drawer que se desliza desde la izquierda.
 */
export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const { collapsed, toggleSidebar } = useSidebar()

  return (
    <>
      {mobileOpen && (
        <div
          aria-hidden
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-surface transition-[transform,width] duration-300 ease-out',
          'lg:sticky lg:top-0 lg:z-20 lg:h-dvh lg:translate-x-0',
          collapsed ? 'lg:w-20' : 'lg:w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className={cn('flex items-center gap-2 px-3 py-4', collapsed && 'lg:flex-col lg:px-2')}>
          <Link
            to={ROUTES.dashboard}
            onClick={onCloseMobile}
            aria-label="Nottia, ir al inicio"
            className="group flex min-w-0 items-center gap-2.5 rounded-lg p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transition-none">
              <Logo size={28} />
            </span>
            <span className={cn('truncate text-base font-bold tracking-tight text-ink', collapsed && 'lg:hidden')}>
              Nottia
            </span>
          </Link>

          <div className={cn('ml-auto flex items-center gap-1', collapsed && 'lg:ml-0')}>
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'}
              title={collapsed ? 'Expandir menú' : 'Contraer menú'}
              className="hidden h-8 w-8 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:grid"
            >
              <ChevronLeftIcon className={cn('h-5 w-5 transition-transform duration-300', collapsed && 'rotate-180')} />
            </button>

            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Cerrar menú"
              className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-canvas hover:text-ink lg:hidden"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {navItems.map((item, index) => (
            <SidebarNavItem
              key={item.to}
              item={item}
              collapsed={collapsed}
              index={index}
              onNavigate={onCloseMobile}
            />
          ))}
        </nav>

        <div className="space-y-1 border-t border-line px-3 py-3 animate-rise motion-reduce:animate-none" style={{ animationDelay: '120ms' }}>
          <SidebarThemeToggle collapsed={collapsed} />
          <SidebarUser collapsed={collapsed} onNavigate={onCloseMobile} />
        </div>
      </aside>
    </>
  )
}
