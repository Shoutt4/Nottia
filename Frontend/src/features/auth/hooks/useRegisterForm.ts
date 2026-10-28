import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'

import { getAppError } from '@/lib/errors'

import { register } from '../api/authApi'
import type {
  RegisterErrors,
  RegisterField,
  RegisterStatus,
  RegisterValues,
} from '../types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY: RegisterValues = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function validate(values: RegisterValues): RegisterErrors {
  const errors: RegisterErrors = {}

  if (!values.nombre.trim()) errors.nombre = 'Escribe tu nombre.'
  else if (values.nombre.trim().length < 2) errors.nombre = 'El nombre es demasiado corto.'

  if (!values.apellido.trim()) errors.apellido = 'Escribe tu apellido.'
  else if (values.apellido.trim().length < 2) errors.apellido = 'El apellido es demasiado corto.'

  if (!values.email.trim()) errors.email = 'Escribe tu correo.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Ese correo no parece válido.'

  if (!values.password) errors.password = 'Escribe tu contraseña.'
  else if (values.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.'
  }

  if (!values.confirmPassword) errors.confirmPassword = 'Repite la contraseña.'
  else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Las contraseñas no coinciden.'
  }

  return errors
}

/**
 * Estado, validación y envío del formulario de registro.
 * Llama a `POST /api/auth/register`; la cuenta queda inactiva hasta verificar el correo.
 */
export function useRegisterForm() {
  const [values, setValues] = useState<RegisterValues>(EMPTY)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [touched, setTouched] = useState<Partial<Record<RegisterField, boolean>>>({})
  const [status, setStatus] = useState<RegisterStatus>('idle')
  const [formError, setFormError] = useState<string | null>(null)

  const setField = useCallback(
    (field: RegisterField, value: string) => {
      const next = { ...values, [field]: value }
      setValues(next)
      if (touched[field]) setErrors(validate(next))
      if (status !== 'idle') setStatus('idle')
      setFormError(null)
    },
    [values, touched, status],
  )

  const handleBlur = useCallback(
    (field: RegisterField) => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      setErrors(validate(values))
    },
    [values],
  )

  const handleSubmit = useCallback(
    async (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault()

      const nextErrors = validate(values)
      setTouched({
        nombre: true,
        apellido: true,
        email: true,
        password: true,
        confirmPassword: true,
      })
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length > 0) return false

      setStatus('submitting')
      setFormError(null)

      try {
        await register({
          nombre: values.nombre.trim(),
          apellido: values.apellido.trim(),
          email: values.email.trim(),
          password: values.password,
        })
        setStatus('success')
        return true
      } catch (error) {
        const appError = getAppError(error instanceof Error ? error : null)
        setStatus('idle')

        if (appError.status === 409) {
          setErrors((current) => ({ ...current, email: 'Ese correo ya tiene una cuenta.' }))
          setFormError('Ese correo ya está registrado. Inicia sesión o usa otro.')
          return false
        }

        setFormError(appError.message)
        return false
      }
    },
    [values],
  )

  const errorFor = useCallback(
    (field: RegisterField) => (touched[field] ? errors[field] : undefined),
    [touched, errors],
  )

  return { values, status, formError, errorFor, setField, handleBlur, handleSubmit }
}
