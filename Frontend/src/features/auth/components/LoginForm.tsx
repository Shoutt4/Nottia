import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, CheckIcon, LockIcon, MailIcon } from '@/components/ui/icons'
import { ROUTES, resendVerificationPath } from '@/config/routes'

import { useLoginForm } from '../hooks/useLoginForm'
import { useShake } from '../hooks/useShake'
import { FormField } from './FormField'

/** Formulario de login conectado a `POST /api/auth/login`. */
export function LoginForm() {
  const { values, status, errorFor, setField, setRemember, handleBlur, handleSubmit } =
    useLoginForm()
  const { ref, shake } = useShake<HTMLFormElement>()
  const navigate = useNavigate()

  const submitting = status === 'submitting'
  const success = status === 'success'

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const result = await handleSubmit(event)

    if (!result.ok) {
      // Correo sin verificar: se abre la página dedicada de reenvío.
      if (result.unverifiedEmail) {
        navigate(resendVerificationPath(result.unverifiedEmail))
        return
      }

      shake()
      return
    }

    // Deja ver el "¡Listo!" un instante antes de entrar.
    window.setTimeout(() => navigate(ROUTES.dashboard), 400)
  }

  return (
    <form ref={ref} onSubmit={onSubmit} noValidate className="mt-7 space-y-4">
      <FormField
        id="email"
        label="Correo electrónico"
        type="email"
        value={values.email}
        onChange={(value) => setField('email', value)}
        onBlur={() => handleBlur('email')}
        error={errorFor('email')}
        autoComplete="email"
        icon={<MailIcon className="h-5 w-5" />}
      />

      <FormField
        id="password"
        label="Contraseña"
        type="password"
        value={values.password}
        onChange={(value) => setField('password', value)}
        onBlur={() => handleBlur('password')}
        error={errorFor('password')}
        autoComplete="current-password"
        icon={<LockIcon className="h-5 w-5" />}
      />

      <div className="flex items-center justify-between pt-1 text-sm">
        <label className="flex cursor-pointer select-none items-center gap-2 text-paper-muted">
          <input
            type="checkbox"
            checked={values.remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="h-4 w-4 rounded border-paper-line accent-accent"
          />
          Recordarme
        </label>
        <Link
          to={ROUTES.forgotPassword}
          className="font-medium text-accent transition-colors hover:text-accent-hover"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <Button type="submit" disabled={submitting || success} className="mt-2 w-full py-3">
        {submitting ? (
          <>
            <span
              aria-hidden
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
            Entrando…
          </>
        ) : success ? (
          <>
            <CheckIcon className="h-5 w-5" />
            ¡Listo!
          </>
        ) : (
          <>
            Entrar
            <ArrowRightIcon className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
