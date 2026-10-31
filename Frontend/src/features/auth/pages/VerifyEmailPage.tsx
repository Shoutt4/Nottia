import type { ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { LogoWordmark } from '@/components/brand/LogoWordmark'
import { buttonClass } from '@/components/ui/buttonStyles'
import { AlertIcon, CheckIcon, LoaderIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ROUTES } from '@/config/routes'
import { getAppError } from '@/lib/errors'
import { cn } from '@/lib/utils'

import { useVerifyEmail } from '../hooks/useVerifyEmail'
export function VerifyEmailPage() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const verification = useVerifyEmail(token)

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-canvas px-5 py-16 text-ink">
      <div aria-hidden className="aurora pointer-events-none absolute inset-0 opacity-90" />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4">
        <Link
          to={ROUTES.home}
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Nottia, ir al inicio"
        >
          <LogoWordmark size={30} />
        </Link>
        <ThemeToggle />
      </div>

      <Reveal>
        <section
          aria-live="polite"
          className="w-full max-w-md rounded-3xl border border-line bg-surface/90 p-8 text-center shadow-[0_45px_90px_-55px_rgba(0,0,0,0.6)] backdrop-blur sm:p-10"
        >
          {!token ? (
            <>
              <StatusIcon tone="danger">
                <AlertIcon className="h-7 w-7" />
              </StatusIcon>
              <h1 className="mt-5 text-2xl font-bold tracking-tight">Enlace incompleto</h1>
              <p className="mt-2 text-sm text-pretty text-muted">
                Este enlace no trae el token de verificación. Abre el enlace del correo que te
                enviamos al registrarte.
              </p>
              <Link to={ROUTES.login} className={buttonClass('primary', 'mt-6 w-full')}>
                Iniciar sesión
              </Link>
              <Link to={ROUTES.register} className={buttonClass('secondary', 'mt-2 w-full')}>
                Crear una cuenta
              </Link>
            </>
          ) : verification.isPending ? (
            <>
              <StatusIcon tone="accent">
                <LoaderIcon className="h-7 w-7 animate-spin" />
              </StatusIcon>
              <h1 className="mt-5 text-2xl font-bold tracking-tight">Verificando tu correo…</h1>
              <p className="mt-2 text-sm text-pretty text-muted">
                Espera un segundo, estamos activando tu cuenta.
              </p>
            </>
          ) : verification.isError ? (
            <>
              <StatusIcon tone="danger">
                <AlertIcon className="h-7 w-7" />
              </StatusIcon>
              <h1 className="mt-5 text-2xl font-bold tracking-tight">
                No pudimos verificar tu correo
              </h1>
              <p className="mt-2 text-sm text-pretty text-muted">{errorMessage(verification.error)}</p>
              <Link to={ROUTES.login} className={buttonClass('primary', 'mt-6 w-full')}>
                Iniciar sesión
              </Link>
              <Link to={ROUTES.home} className={buttonClass('ghost', 'mt-1 w-full')}>
                Volver al inicio
              </Link>
            </>
          ) : (
            <>
              <StatusIcon tone="accent">
                <CheckIcon className="h-7 w-7" />
              </StatusIcon>
              <h1 className="mt-5 text-2xl font-bold tracking-tight">¡Correo verificado!</h1>
              <p className="mt-2 text-sm text-pretty text-muted">
                Tu cuenta ya está activa. Inicia sesión para empezar a escribir.
              </p>
              <Link to={ROUTES.login} className={buttonClass('primary', 'mt-6 w-full')}>
                Iniciar sesión
              </Link>
            </>
          )}
        </section>
      </Reveal>
    </div>
  )
}

function errorMessage(error: Error | null): string {
  const appError = getAppError(error)

  if (appError.status === 403) return 'Este enlace ya se usó o no es válido.'
  if (appError.status === 404) return 'El enlace caducó. Los enlaces duran 15 minutos.'

  return appError.message
}

function StatusIcon({ tone, children }: { tone: 'accent' | 'danger'; children: ReactNode }) {
  return (
    <span
      className={cn(
        'mx-auto grid h-14 w-14 place-items-center rounded-2xl',
        tone === 'accent' ? 'bg-accent-soft text-accent' : 'bg-danger-soft text-danger',
      )}
    >
      {children}
    </span>
  )
}
