import { MoonIcon, SunIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/stores/uiStore'

interface SidebarThemeToggleProps {
  collapsed: boolean
}

/**
 * Interruptor de tema (claro/oscuro) del sidebar.
 * El ícono hace un cruce giratorio y el switch desliza su perilla.
 */
export function SidebarThemeToggle({ collapsed }: SidebarThemeToggleProps) {
  const theme = useUiStore((state) => state.theme)
  const toggleTheme = useUiStore((state) => state.toggleTheme)
  const isDark = theme === 'dark'
  const label = isDark ? 'Modo claro' : 'Modo oscuro'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={label}
      className={cn(
        'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        collapsed && 'lg:justify-center lg:px-0',
      )}
    >
      <span className="relative h-5 w-5 shrink-0">
        <SunIcon
          className={cn(
            'absolute inset-0 h-5 w-5 transition-all duration-300 ease-out motion-reduce:transition-none',
            isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0',
          )}
        />
        <MoonIcon
          className={cn(
            'absolute inset-0 h-5 w-5 transition-all duration-300 ease-out motion-reduce:transition-none',
            isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100',
          )}
        />
      </span>

      <span className={cn('flex-1 text-left', collapsed && 'lg:hidden')}>{label}</span>

      <span
        aria-hidden
        className={cn(
          'relative h-5 w-9 shrink-0 rounded-full border border-line transition-colors duration-300',
          isDark ? 'bg-accent' : 'bg-canvas',
          collapsed && 'lg:hidden',
        )}
      >
        <span
          className={cn(
            'absolute top-1/2 left-0.5 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-surface shadow-sm transition-all duration-300 ease-out motion-reduce:transition-none',
            isDark && 'translate-x-4',
          )}
        />
      </span>

      {collapsed && (
        <span className="pointer-events-none absolute left-full z-50 ml-3 hidden whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium text-canvas opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
          {label}
        </span>
      )}
    </button>
  )
}
