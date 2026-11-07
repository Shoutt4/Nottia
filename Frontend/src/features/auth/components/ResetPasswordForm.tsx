import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { buttonClass } from '@/components/ui/buttonStyles'
import {
  AlertIcon,
  ArrowRightIcon,
  CheckIcon,
  LoaderIcon,
  LockIcon,
  MailIcon,
} from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'

import { useResetPasswordForm } from '../hooks/useResetPasswordForm'
import { FormField } from './FormField'

interface ResetPasswordFormProps {
  token: string
}

/** Formulario del enlace de recuperación: define el correo y la nueva clave. */
export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { values, status, formError, errorFor, setField, handleBlur, handleSubmit } =
    useResetPasswordForm(token)

  const submitting = status === 'submitting'

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    await handleSubmit(event)
  }

  if (status === 'success') {
    return (
      <div aria-live="polite" className="mt-7 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-paper-accent/15 text-paper-accent">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h2 className="mt-4 font-serif text-2xl font-semibold tracking-[-0.02em] text-paper-ink">
          Contraseña actualizada
        </h2>
        <p className="mt-2 text-sm text-paper-muted">
          Ya puedes entrar a Nottia con tu nueva contraseña.
        </p>
        <Link to={ROUTES.login} className={buttonClass('primary', 'mt-6 w-full py-3')}>
          Iniciar sesión
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-7 space-y-4">
      <p className="text-sm leading-relaxed text-paper-muted">
        Confirma el correo con el que pediste el cambio y elige una contraseña nueva.
      </p>

      <FormField
        id="reset-email"
        label="Correo electrónico"
        type="email"
        value={values.email}
        onChange={(value) => setField('email', value)}
        onBlur={() => handleBlur('email')}
        error={errorFor('email')}
        autoComplete="email"
        maxLength={200}
        icon={<MailIcon className="h-5 w-5" />}
      />

      <FormField
        id="reset-password"
        label="Nueva contraseña"
        type="password"
        value={values.password}
        onChange={(value) => setField('password', value)}
        onBlur={() => handleBlur('password')}
        error={errorFor('password')}
        autoComplete="new-password"
        maxLength={30}
        icon={<LockIcon className="h-5 w-5" />}
      />

      <FormField
        id="reset-confirm-password"
        label="Repite la contraseña"
        type="password"
        value={values.confirmPassword}
        onChange={(value) => setField('confirmPassword', value)}
        onBlur={() => handleBlur('confirmPassword')}
        error={errorFor('confirmPassword')}
        autoComplete="new-password"
        maxLength={30}
        icon={<LockIcon className="h-5 w-5" />}
      />

      {formError ? (
        <>
          <p
            role="alert"
            className="flex items-start gap-2 rounded-[3px] bg-danger-soft px-3 py-2 text-xs leading-relaxed text-danger"
          >
            <AlertIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{formError}</span>
          </p>
          <Link
            to={ROUTES.forgotPassword}
            className="block text-center text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Pedir un enlace nuevo
          </Link>
        </>
      ) : null}

      <Button type="submit" disabled={submitting} className="mt-2 w-full py-3">
        {submitting ? (
          <>
            <LoaderIcon className="h-4 w-4 animate-spin" />
            Guardando…
          </>
        ) : (
          <>
            Guardar contraseña
            <ArrowRightIcon className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
