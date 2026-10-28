import { Link } from 'react-router-dom'

import { buttonClass } from '@/components/ui/buttonStyles'
import { MailIcon } from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'

/** Confirmación tras crear la cuenta: falta abrir el enlace del correo. */
export function RegisterSuccess({ email }: { email: string }) {
  return (
    <div className="text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent">
        <MailIcon className="h-7 w-7" />
      </span>

      <h1 className="mt-5 text-2xl font-bold tracking-tight">Revisa tu correo</h1>
      <p className="mt-2 text-sm text-pretty text-muted">
        Te enviamos un enlace a <span className="font-semibold text-ink">{email}</span>. Ábrelo para
        activar tu cuenta; caduca en 15 minutos.
      </p>
      <p className="mt-3 text-xs text-muted">Si no lo ves, revisa la carpeta de spam.</p>

      <Link to={ROUTES.login} className={buttonClass('primary', 'mt-6 w-full')}>
        Ir a iniciar sesión
      </Link>
    </div>
  )
}
