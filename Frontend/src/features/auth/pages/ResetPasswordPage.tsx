import { Link, useSearchParams } from 'react-router-dom'

import { buttonClass } from '@/components/ui/buttonStyles'
import { AlertIcon, LoaderIcon } from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'
import { getAppError } from '@/lib/errors'

import { AuthLayout } from '../components/AuthLayout'
import { ResetPasswordForm } from '../components/ResetPasswordForm'
import { useResetPasswordToken } from '../hooks/useResetPasswordToken'

const perks = [
  'El enlace caduca en 15 minutos',
  'Tu correo debe coincidir con el de la cuenta',
  'Tus notas siguen donde las dejaste',
]

/** Página a la que apunta el enlace del correo de recuperación. */
export function ResetPasswordPage() {
  const [params] = useSearchParams()
  const token = params.get('token')?.trim() || null
  const validation = useResetPasswordToken(token)

  return (
    <AuthLayout
      eyebrow="Nueva contraseña"
      heading="Vuelve a tus notas con una clave nueva."
      description="El enlace del correo te permite elegir una contraseña distinta. Después podrás iniciar sesión como siempre."
      perks={perks}
      cardEyebrow="Recuperación"
      cardNumber="N.º 04"
      coverNumber="N.º 04"
    >
      <h1 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-paper-ink">
        Restablece tu contraseña
      </h1>
      <p className="mt-2 text-sm text-paper-muted">
        Estás a un paso de recuperar el acceso a tu cuenta.
      </p>

      {!token ? (
        <TokenProblem
          title="Enlace incompleto"
          message="Este enlace no trae el token de recuperación. Abre de nuevo el enlace del correo o pide uno nuevo."
        />
      ) : validation.isPending ? (
        <CheckingToken />
      ) : validation.isError ? (
        <TokenProblem
          title={tokenErrorTitle(validation.error)}
          message={tokenErrorMessage(validation.error)}
        />
      ) : (
        <ResetPasswordForm token={token} />
      )}
    </AuthLayout>
  )
}

function isTokenProblem(error: Error | null): boolean {
  const appError = getAppError(error)

  return appError.status === 400 || appError.message.toLowerCase().includes('token')
}

function tokenErrorTitle(error: Error | null): string {
  return isTokenProblem(error)
    ? 'El enlace ya no es válido'
    : 'No pudimos comprobar el enlace'
}

function tokenErrorMessage(error: Error | null): string {
  if (isTokenProblem(error)) {
    return 'Este enlace caducó o ya se usó. Pide uno nuevo para cambiar tu contraseña.'
  }

  return getAppError(error).message
}

function CheckingToken() {
  return (
    <div aria-live="polite" className="mt-7 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-paper-accent/15 text-paper-accent">
        <LoaderIcon className="h-7 w-7 animate-spin" />
      </span>
      <p className="mt-4 text-sm text-paper-muted">Comprobando el enlace…</p>
    </div>
  )
}

interface TokenProblemProps {
  title: string
  message: string
}

function TokenProblem({ title, message }: TokenProblemProps) {
  return (
    <div aria-live="polite" className="mt-7 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-danger-soft text-danger">
        <AlertIcon className="h-7 w-7" />
      </span>
      <h2 className="mt-4 font-serif text-2xl font-semibold tracking-[-0.02em] text-paper-ink">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-paper-muted">{message}</p>
      <Link to={ROUTES.forgotPassword} className={buttonClass('primary', 'mt-6 w-full py-3')}>
        Pedir un enlace nuevo
      </Link>
      <Link to={ROUTES.login} className={buttonClass('secondary', 'mt-2 w-full py-3')}>
        Iniciar sesión
      </Link>
    </div>
  )
}
