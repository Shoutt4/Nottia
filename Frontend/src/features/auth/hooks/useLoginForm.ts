import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'

import { setToken } from '@/config'
import { getAppError } from '@/lib/errors'
import { toast } from '@/lib/toast'

import { login } from '../api/authApi'
import type { LoginCredentials, LoginErrors, LoginField, LoginStatus } from '../types'

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
  if (appError.status === 404) return 'Verifica tu correo antes de iniciar sesión.'
  if (appError.kind === 'auth' || appError.status === 500) return 'Correo o contraseña incorrectos.'

  return appError.message
}

/**
 * Estado, validación y envío del formulario de login.
 * Llama a `POST /api/auth/login`, guarda el JWT y devuelve si tuvo éxito.
 * Los resultados se comunican con avisos (`toast`).
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
    async (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault()

      const nextErrors = validate(values)
      setTouched({ email: true, password: true })
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length > 0) return false

      setStatus('submitting')

      try {
        const token = await login({ email: values.email, password: values.password })
        setToken(token, values.remember)
        setStatus('success')
        toast.success('¡Bienvenido de nuevo!')
        return true
      } catch (error) {
        setStatus('idle')
        toast.error(loginErrorMessage(error instanceof Error ? error : null))
        return false
      }
    },
    [values],
  )

  const errorFor = useCallback(
    (field: LoginField) => (touched[field] ? errors[field] : undefined),
    [touched, errors],
  )

  return { values, status, errorFor, setField, setRemember, handleBlur, handleSubmit }
}
