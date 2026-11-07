import { Avatar } from '@/components/ui/Avatar'
import { MailIcon, PhoneIcon } from '@/components/ui/icons'

import { adminFullName, formatAdminDate, shortId } from '../lib/format'
import type { AdminUser } from '../types'

interface AdminUsersListProps {
  users: AdminUser[]
}

/** Directorio de cuentas: nombre, contacto e identificador de cada usuario. */
export function AdminUsersList({ users }: AdminUsersListProps) {
  return (
    <div className="overflow-hidden rounded-[4px] border border-paper-line bg-paper/70">
      <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] gap-5 border-b border-paper-line bg-desk/35 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted sm:grid">
        <span>Usuario</span>
        <span>Contacto</span>
        <span>Identificador</span>
      </div>

      <ul aria-label="Usuarios registrados" className="divide-y divide-paper-line">
        {users.map((user) => {
          const name = adminFullName(user) || user.email || 'Sin nombre'

          return (
            <li
              key={user.idUsuario}
              className="px-5 py-4 transition-colors duration-200 hover:bg-desk/25"
            >
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] sm:items-center sm:gap-5">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar
                    name={name}
                    src={user.urlAvatar}
                    className="h-10 w-10 rounded-full text-xs ring-1 ring-paper-line"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-serif text-[15px] font-semibold text-paper-ink">
                      {name}
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper-muted">
                      Cuenta de usuario
                    </p>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted sm:hidden">
                    Contacto
                  </p>
                  <p
                    className="mt-1 inline-flex max-w-full items-center gap-1.5 text-sm text-paper-ink sm:mt-0"
                    title={user.email ?? undefined}
                  >
                    <MailIcon className="h-3.5 w-3.5 shrink-0 text-paper-accent/80" />
                    <span className="truncate">{user.email || 'Sin correo'}</span>
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-paper-muted">
                    <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-paper-accent/60" />
                    <span>{user.phone || 'Sin teléfono'}</span>
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted sm:hidden">
                    Identificador
                  </p>
                  <p
                    className="mt-1 truncate font-mono text-[11px] tracking-[0.04em] text-paper-ink sm:mt-0"
                    title={user.idUsuario}
                  >
                    {shortId(user.idUsuario)}
                  </p>
                  {user.createAt && (
                    <p className="mt-1 text-[11px] text-paper-muted">
                      Alta: {formatAdminDate(user.createAt)}
                    </p>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
