import { useNavigate } from 'react-router-dom'

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { LogOutIcon, MailIcon, PhoneIcon, ShieldIcon, UserIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { clearToken, getCurrentUser } from '@/config'
import { ROUTES } from '@/config/routes'

import { ProfileField } from '../components/ProfileField'

const ROLE_LABELS: Record<string, string> = {
  USUARIO: 'Usuario',
  ADMIN: 'Administrador',
}

/** Perfil: datos del usuario leídos de los claims del JWT. */
export function ProfilePage() {
  const user = getCurrentUser()
  const navigate = useNavigate()

  const name = user.nombre ?? 'Tu cuenta'
  const email = user.email ?? 'Sin correo'
  const role = user.role ? (ROLE_LABELS[user.role] ?? user.role) : null

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
          <div className="flex flex-col items-center px-6 pb-7 text-center">
            <Avatar
              name={name}
              src={user.avatarUrl}
              className="-mt-12 h-20 w-20 rounded-full text-2xl ring-4 ring-surface"
            />
            <h2 className="mt-4 text-xl font-bold">{name}</h2>
            <p className="text-sm text-muted">{email}</p>
            {role && (
              <span className="mt-3 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                {role}
              </span>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="grid gap-3 sm:grid-cols-2">
          <ProfileField icon={<UserIcon className="h-5 w-5" />} label="Nombre" value={name} />
          <ProfileField icon={<MailIcon className="h-5 w-5" />} label="Correo" value={email} />
          <ProfileField
            icon={<PhoneIcon className="h-5 w-5" />}
            label="Teléfono"
            value={user.phone ?? 'Sin registrar'}
          />
          <ProfileField
            icon={<ShieldIcon className="h-5 w-5" />}
            label="Rol"
            value={role ?? 'Sin rol'}
          />
          <ProfileField
            icon={<UserIcon className="h-5 w-5" />}
            label="ID de usuario"
            value={user.id ?? 'No disponible'}
          />
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="rounded-3xl border border-dashed border-line bg-surface/60 px-6 py-8 text-center">
          <p className="text-sm font-semibold text-ink">Perfil temporal</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Estos datos vienen del token de tu sesión. Aquí podrás editarlos cuando conectemos el
            endpoint de usuarios.
          </p>
        </div>
      </Reveal>

      <Reveal delay={260}>
        <Button variant="secondary" onClick={handleLogout} className="w-full py-3 sm:w-auto">
          <LogOutIcon className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </Reveal>
    </div>
  )
}
