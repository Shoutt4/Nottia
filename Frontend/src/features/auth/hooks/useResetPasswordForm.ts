import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'

import { getAppError } from '@/lib/errors'

import { resetPassword } from '../api/authApi'
import type {
  ResetPasswordErrors,
  ResetPasswordField,
  ResetPasswordStatus,
  ResetPasswordValues,
} from '../types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY: ResetPasswordValues = {
  email: '',
  password: '',
  confirmPassword: '',
}

function validate(values: ResetPasswordValues): ResetPasswordErrors {
  const errors: ResetPasswordErrors = {}

  if (!values.email.trim()) errors.email = 'Escribe el correo de tu cuenta.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Ese correo no parece válido.'

  if (!values.password) errors.password = 'Escribe tu nueva contraseña.'
  else if (values.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.'
  } else if (values.password.length > 30) {
    errors.password = 'La contraseña no puede superar los 30 caracteres.'
  }

  if (!values.confirmPassword) errors.confirmPassword = 'Repite la contraseña.'
  else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Las contraseñas no coinciden.'
  }

  return errors
}

/**
 * Estado, validación y envío del cambio de contraseña.
 * Llama a `POST /api/email/rest/verify?token=…` con el correo y la nueva clave.
 */
export function useResetPasswordForm(token: string) {
  const [values, setValues] = useState<ResetPasswordValues>(EMPTY)
  const [errors, setErrors] = useState<ResetPasswordErrors>({})
  const [touched, setTouched] = useState<Partial<Record<ResetPasswordField, boolean>>>({})
  const [status, setStatus] = useState<ResetPasswordStatus>('idle')
  const [formError, setFormError] = useState<string | null>(null)

  const setField = useCallback(
    (field: ResetPasswordField, value: string) => {
      const next = { ...values, [field]: value }
      setValues(next)
      if (touched[field]) setErrors(validate(next))
      if (status !== 'idle') setStatus('idle')
      setFormError(null)
    },
    [values, touched, status],
  )

  const handleBlur = useCallback(
    (field: ResetPasswordField) => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      setErrors(validate(values))
    },
    [values],
  )

  const handleSubmit = useCallback(
    async (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault()

      const nextErrors = validate(values)
      setTouched({ email: true, password: true, confirmPassword: true })
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length > 0) return false

      setStatus('submitting')
      setFormError(null)

      try {
        await resetPassword(token, {
          email: values.email.trim(),
          password: values.password,
        })
        setStatus('success')
        return true
      } catch (error) {
        const appError = getAppError(error instanceof Error ? error : null)
        setStatus('idle')

        const fieldErrors: ResetPasswordErrors = {}
        if (appError.fields.email) fieldErrors.email = appError.fields.email
        if (appError.fields.password) fieldErrors.password = appError.fields.password

        const hasFieldErrors = Object.keys(fieldErrors).length > 0
        if (hasFieldErrors) {
          setErrors((current) => ({ ...current, ...fieldErrors }))
        }

        const backendMessage = appError.message.toLowerCase()
        const tokenProblem =
          !hasFieldErrors &&
          (appError.status === 400 || backendMessage.includes('token'))

        setFormError(
          hasFieldErrors
            ? 'Revisa los datos marcados e inténtalo de nuevo.'
            : tokenProblem
              ? 'El enlace no es válido o caducó. Revisa el correo o pide un enlace nuevo.'
              : appError.message,
        )
        return false
      }
    },
    [token, values],
  )

  const errorFor = useCallback(
    (field: ResetPasswordField) => (touched[field] ? errors[field] : undefined),
    [touched, errors],
  )

  return { values, status, formError, errorFor, setField, handleBlur, handleSubmit }
}
