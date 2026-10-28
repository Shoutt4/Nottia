import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, LockIcon, MailIcon, UserIcon } from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'

import { useRegisterForm } from '../hooks/useRegisterForm'
import { useShake } from '../hooks/useShake'
import { FormField } from './FormField'
import { RegisterSuccess } from './RegisterSuccess'

/** Contenido de la tarjeta de registro, conectado a `POST /api/auth/register`. */
export function RegisterForm() {
  const { values, status, formError, errorFor, setField, handleBlur, handleSubmit } =
    useRegisterForm()
  const { ref, shake } = useShake<HTMLFormElement>()

  const submitting = status === 'submitting'

  // La cuenta queda inactiva hasta abrir el enlace del correo: se sustituye
  // toda la tarjeta por la confirmación.
  if (status === 'success') return <RegisterSuccess email={values.email.trim()} />

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const ok = await handleSubmit(event)
    if (!ok) shake()
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Crea tu cuenta</h1>
      <p className="mt-1.5 text-sm text-muted">Gratis. Solo necesitas un correo.</p>

      <form ref={ref} onSubmit={onSubmit} noValidate className="mt-7 space-y-4">
        <FormField
          id="nombre"
          label="Nombre"
          value={values.nombre}
          onChange={(value) => setField('nombre', value)}
          onBlur={() => handleBlur('nombre')}
          error={errorFor('nombre')}
          autoComplete="given-name"
          maxLength={50}
          icon={<UserIcon className="h-5 w-5" />}
        />

        <FormField
          id="apellido"
          label="Apellido"
          value={values.apellido}
          onChange={(value) => setField('apellido', value)}
          onBlur={() => handleBlur('apellido')}
          error={errorFor('apellido')}
          autoComplete="family-name"
          maxLength={100}
          icon={<UserIcon className="h-5 w-5" />}
        />

        <FormField
          id="email"
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
          id="password"
          label="Contraseña"
          type="password"
          value={values.password}
          onChange={(value) => setField('password', value)}
          onBlur={() => handleBlur('password')}
          error={errorFor('password')}
          autoComplete="new-password"
          icon={<LockIcon className="h-5 w-5" />}
        />

        <FormField
          id="confirmPassword"
          label="Repetir contraseña"
          type="password"
          value={values.confirmPassword}
          onChange={(value) => setField('confirmPassword', value)}
          onBlur={() => handleBlur('confirmPassword')}
          error={errorFor('confirmPassword')}
          autoComplete="new-password"
          icon={<LockIcon className="h-5 w-5" />}
        />

        {formError && (
          <p
            role="alert"
            className="rounded-xl border border-danger/30 bg-danger-soft px-3.5 py-2.5 text-xs font-medium text-danger"
          >
            {formError}
          </p>
        )}

        <Button type="submit" disabled={submitting} className="mt-2 w-full py-3">
          {submitting ? (
            <>
              <span
                aria-hidden
                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              />
              Creando cuenta…
            </>
          ) : (
            <>
              Crear cuenta
              <ArrowRightIcon className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        ¿Ya tienes cuenta?{' '}
        <Link
          to={ROUTES.login}
          className="font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Inicia sesión
        </Link>
      </p>
    </>
  )
}
