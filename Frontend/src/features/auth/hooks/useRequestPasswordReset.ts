import { useCallback, useState } from 'react'

import { getAppError } from '@/lib/errors'

import { requestPasswordReset } from '../api/authApi'
import type { RequestResetStatus } from '../types'

/**
 * Solicita el correo de recuperación. El resultado se muestra dentro del
 * formulario, sin `toast`, igual que el reenvío de verificación.
 */
export function useRequestPasswordReset(email: string) {
  const [status, setStatus] = useState<RequestResetStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const send = useCallback(async () => {
    if (status === 'sending') return

    setStatus('sending')
    setMessage(null)

    try {
      await requestPasswordReset(email)
      setStatus('sent')
    } catch (error) {
      const appError = getAppError(error instanceof Error ? error : null)
      const backendMessage = appError.message.toLowerCase()

      setStatus('error')

      if (backendMessage.includes('email no encontrado')) {
        setMessage('No encontramos una cuenta con ese correo. Revisa que esté bien escrito.')
      } else if (backendMessage.includes('no se pudo enviar')) {
        setMessage('No pudimos enviar el correo. Inténtalo de nuevo en un momento.')
      } else {
        setMessage(appError.message)
      }
    }
  }, [email, status])

  const reset = useCallback(() => {
    setStatus('idle')
    setMessage(null)
  }, [])

  return { status, message, send, reset }
}
