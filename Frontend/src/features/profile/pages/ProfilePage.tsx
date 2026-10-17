import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { LogOutIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { clearToken, getCurrentUser } from '@/config'
import { ROUTES } from '@/config/routes'
import { getInitials } from '@/lib/utils'

/** Perfil temporal: datos leídos del JWT (aún sin edición ni backend). */
export function ProfilePage() {
  const user = getCurrentUser()
  const navigate = useNavigate()

  const name = user.nombre ?? 'Tu cuenta'
  const email = user.email ?? 'Sin correo'

  const handleLogout = () => {
    clearToken()
    navigate(ROUTES.home)
  }

  return (
    <div className="space-y-6">
      <Reveal>
        <h1 className="text-2xl font-bold tracking-tight">Perfil</h1>
        <p className="mt-1 text-sm text-muted">Tu información en Nottia.</p>
      </Reveal>

      <Reveal delay={80}>
        <div className="overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="aurora h-24 opacity-80" />
          <div className="flex flex-col items-center px-6 pb-8 text-center">
            <span className="-mt-12 grid h-20 w-20 place-items-center rounded-full border-4 border-surface bg-accent text-2xl font-bold text-on-accent">
              {getInitials(name)}
            </span>
            <h2 className="mt-4 text-xl font-bold">{name}</h2>
            <p className="text-sm text-muted">{email}</p>
            {user.role && (
              <span className="mt-3 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                {user.role}
              </span>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="rounded-3xl border border-dashed border-line bg-surface/60 px-6 py-8 text-center">
          <p className="text-sm font-semibold text-ink">Perfil temporal</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Aquí podrás editar tu nombre, foto y contraseña cuando conectemos el endpoint de usuarios.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <Button variant="secondary" onClick={handleLogout} className="w-full py-3 sm:w-auto">
          <LogOutIcon className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </Reveal>
    </div>
  )
}
