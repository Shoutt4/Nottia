import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'

import { setToken } from '@/config'
import { getAppError } from '@/lib/errors'
import { toast } from '@/lib/toast'

import { login } from '../api/authApi'
import type {
  LoginCredentials,
  LoginErrors,
  LoginField,
  LoginResult,
  LoginStatus,
} from '../types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY: LoginCredentials = { email: '', password: '', remember: true }

function validate(values: LoginCredentials): LoginErrors {
  const errors: LoginErrors = {}

  if (!values.email.trim()) errors.email = 'Escribe tu correo.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Ese correo no parece válido.'

  if (!values.password) errors.password = 'Escribe tu contraseña.'
  else if (values.password.length < 8) errors.password = 'La contraseña debe tener al menos 8 caracteres.'

  return errors
}

/**
 * Mensaje estándar del login. No revela si el correo existe (evita enumerar
 * cuentas): el backend responde 500 con credenciales inválidas, así que ambos
 * casos se muestran igual.
 */
function loginErrorMessage(error: Error | null): string {
  const appError = getAppError(error)

  if (appError.kind === 'network') return appError.message
  if (appError.kind === 'auth' || appError.status === 500) return 'Correo o contraseña incorrectos.'

  return appError.message
}

/**
 * Estado, validación y envío del formulario de login.
 * Llama a `POST /api/auth/login`, guarda el JWT y devuelve el resultado.
 * Los errores se muestran con `toast`; si el correo no está verificado,
 * devuelve `unverifiedEmail` para navegar a la página de reenvío.
 */
export function useLoginForm() {
  const [values, setValues] = useState<LoginCredentials>(EMPTY)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [touched, setTouched] = useState<Partial<Record<LoginField, boolean>>>({})
  const [status, setStatus] = useState<LoginStatus>('idle')

  const setField = useCallback(
    (field: LoginField, value: string) => {
      const next = { ...values, [field]: value }
      setValues(next)
      // Feedback en vivo, pero solo tras haber tocado el campo.
      if (touched[field]) setErrors(validate(next))
      if (status !== 'idle') setStatus('idle')
    },
    [values, touched, status],
  )

  const setRemember = useCallback((remember: boolean) => {
    setValues((prev) => ({ ...prev, remember }))
  }, [])

  const handleBlur = useCallback(
    (field: LoginField) => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      setErrors(validate(values))
    },
    [values],
  )

  const handleSubmit = useCallback(
    async (event?: FormEvent<HTMLFormElement>): Promise<LoginResult> => {
      event?.preventDefault()

      const nextErrors = validate(values)
      setTouched({ email: true, password: true })
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length > 0) return { ok: false }

      setStatus('submitting')

      try {
        const token = await login({ email: values.email, password: values.password })
        setToken(token, values.remember)
        setStatus('success')
        toast.success('¡Bienvenido de nuevo!')
        return { ok: true }
      } catch (error) {
        const normalizedError = error instanceof Error ? error : null
        const appError = getAppError(normalizedError)
        setStatus('idle')

        // La cuenta existe pero no se ha verificado: el formulario navega a
        // la página de reenvío con el correo ya cargado.
        if (appError.status === 404) {
          return { ok: false, unverifiedEmail: values.email.trim() }
        }

        toast.error(loginErrorMessage(normalizedError))
        return { ok: false }
      }
    },
    [values],
  )

  const errorFor = useCallback(
    (field: LoginField) => (touched[field] ? errors[field] : undefined),
    [touched, errors],
  )

  return {
    values,
    status,
    errorFor,
    setField,
    setRemember,
    handleBlur,
    handleSubmit,
  }
}
