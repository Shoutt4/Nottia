import { useCallback, useState } from 'react'

import { getAppError } from '@/lib/errors'

import { resendVerification } from '../api/authApi'
import type { ResendStatus } from '../types'

/**
 * Reenvía el correo de verificación de una cuenta sin activar.
 * No usa `toast`: el resultado se muestra dentro de la página de reenvío.
 */
export function useResendVerification(email: string) {
  const [status, setStatus] = useState<ResendStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const resend = useCallback(async () => {
    if (status === 'sending') return

    setStatus('sending')
    setMessage(null)

    try {
      await resendVerification(email)
      setStatus('sent')
    } catch (error) {
      const appError = getAppError(error instanceof Error ? error : null)
      setStatus('error')
      setMessage(
        appError.status === 404
          ? 'Ese correo ya está verificado. Vuelve a iniciar sesión.'
          : appError.message,
      )
    }
  }, [email, status])

  const reset = useCallback(() => {
    setStatus('idle')
    setMessage(null)
  }, [])

  return { status, message, resend, reset }
}
