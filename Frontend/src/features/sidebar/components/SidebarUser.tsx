import { Link, useNavigate } from 'react-router-dom'

import { Avatar } from '@/components/ui/Avatar'
import { LogOutIcon } from '@/components/ui/icons'
import { clearToken } from '@/config'
import { ROUTES } from '@/config/routes'
import { fullName, useProfile } from '@/features/profile'
import { cn } from '@/lib/utils'

interface SidebarUserProps {
  collapsed: boolean
  onNavigate?: () => void
}

/** Tarjeta de usuario al pie del sidebar: avatar, nombre, correo y cerrar sesión. */
export function SidebarUser({ collapsed, onNavigate }: SidebarUserProps) {
  const { data: profile, isPending } = useProfile()
  const navigate = useNavigate()

  const name = fullName(profile) || 'Tu cuenta'

  const handleLogout = () => {
    clearToken()
    navigate(ROUTES.home)
  }

  return (
    <div className={cn('flex items-center gap-1.5', collapsed && 'lg:justify-center')}>
      <Link
        to={ROUTES.profile}
        onClick={onNavigate}
        title={name}
        className={cn(
          'group flex min-w-0 flex-1 items-center gap-2.5 rounded-md border border-transparent p-1.5 transition-colors duration-200 hover:border-paper-line hover:bg-desk/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-accent',
          collapsed && 'lg:flex-none lg:justify-center lg:p-1',
        )}
      >
        {isPending ? (
          <span className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-paper-line" />
        ) : (
          <Avatar
            name={name}
            src={profile?.urlAvatar}
            showStatus
            className="h-9 w-9 text-xs shadow-sm transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
          />
        )}

        <span className={cn('min-w-0', collapsed && 'lg:hidden')}>
          {isPending ? (
            <span className="grid gap-1.5">
              <span className="block h-3 w-24 animate-pulse rounded bg-paper-line" />
              <span className="block h-2.5 w-32 animate-pulse rounded bg-paper-line" />
            </span>
          ) : (
            <>
              <span className="block truncate font-serif text-sm font-semibold text-paper-ink">
                {name}
              </span>
              <span className="block truncate font-mono text-[10px] tracking-[0.04em] text-paper-muted">
                {profile?.email ?? ''}
              </span>
            </>
          )}
        </span>
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
        className={cn(
          'grid h-8 w-8 shrink-0 place-items-center rounded-md text-paper-muted transition-colors duration-200 hover:bg-danger-soft hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-accent',
          collapsed && 'lg:hidden',
        )}
      >
        <LogOutIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
