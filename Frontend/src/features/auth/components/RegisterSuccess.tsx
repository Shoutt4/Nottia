import { Link } from 'react-router-dom'

import { buttonClass } from '@/components/ui/buttonStyles'
import { MailIcon } from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'

/** Confirmación tras crear la cuenta: falta abrir el enlace del correo. */
export function RegisterSuccess({ email }: { email: string }) {
  return (
    <div className="text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-paper-accent/10 text-paper-accent">
        <MailIcon className="h-7 w-7" />
      </span>

      <h1 className="mt-5 font-serif text-3xl font-semibold tracking-[-0.02em] text-paper-ink">
        Revisa tu correo
      </h1>
      <p className="mt-2 text-sm text-pretty leading-relaxed text-paper-muted">
        Te enviamos un enlace a <span className="font-semibold text-paper-ink">{email}</span>. Ábrelo
        para activar tu cuenta; caduca en 15 minutos.
      </p>
      <p className="mt-3 text-xs text-paper-muted">Si no lo ves, revisa la carpeta de spam.</p>

      <Link to={ROUTES.login} className={buttonClass('primary', 'mt-6 w-full')}>
        Ir a iniciar sesión
      </Link>
    </div>
  )
}
