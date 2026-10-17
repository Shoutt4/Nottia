import { Link, useNavigate } from 'react-router-dom'

import { Avatar } from '@/components/ui/Avatar'
import { LogOutIcon } from '@/components/ui/icons'
import { clearToken, getCurrentUser } from '@/config'
import { ROUTES } from '@/config/routes'
import { cn } from '@/lib/utils'

interface SidebarUserProps {
  collapsed: boolean
  onNavigate?: () => void
}

/** Tarjeta de usuario al pie del sidebar: avatar, nombre, correo y cerrar sesión. */
export function SidebarUser({ collapsed, onNavigate }: SidebarUserProps) {
  const user = getCurrentUser()
  const navigate = useNavigate()

  const name = user.nombre ?? 'Tu cuenta'

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
        className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-xl p-1.5 transition-colors duration-200 hover:bg-canvas"
      >
        <Avatar
          name={name}
          src={user.avatarUrl}
          showStatus
          className="h-9 w-9 text-xs shadow-sm transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
        />
        <span className={cn('min-w-0', collapsed && 'lg:hidden')}>
          <span className="block truncate text-sm font-semibold text-ink">{name}</span>
          <span className="block truncate text-xs text-muted">{user.email ?? ''}</span>
        </span>
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
        className={cn(
          'grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-danger-soft hover:text-danger',
          collapsed && 'lg:hidden',
        )}
      >
        <LogOutIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
