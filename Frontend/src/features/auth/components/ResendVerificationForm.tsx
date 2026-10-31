import { useState } from 'react'
import type { FormEvent } from 'react'

import { Button } from '@/components/ui/Button'
import { AlertIcon, CheckIcon, LoaderIcon, MailIcon } from '@/components/ui/icons'

import { useResendVerification } from '../hooks/useResendVerification'
import { FormField } from './FormField'
import { UnverifiedEmailNotice } from './UnverifiedEmailNotice'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ResendVerificationFormProps {
  initialEmail?: string
}

/** Formulario de reenvío que vive en su propia página, no dentro del login. */
export function ResendVerificationForm({ initialEmail = '' }: ResendVerificationFormProps) {
  const [email, setEmail] = useState(initialEmail)
  const [error, setError] = useState<string | undefined>()
  const { status, message, resend, reset } = useResendVerification(email)

  const sending = status === 'sending'
  const sent = status === 'sent'
  const errorMessage = status === 'error' ? message : null

  const onChange = (value: string) => {
    setEmail(value)
    if (error) setError(undefined)
    if (status !== 'idle') reset()
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!EMAIL_RE.test(email.trim())) {
      setError('Escribe un correo válido.')
      return
    }

    setError(undefined)
    await resend()
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 space-y-4">
      {initialEmail && email === initialEmail ? (
        <UnverifiedEmailNotice email={initialEmail} />
      ) : null}

      <FormField
        id="resend-email"
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={onChange}
        error={error}
        autoComplete="email"
        maxLength={200}
        icon={<MailIcon className="h-5 w-5" />}
      />

      {sent ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-[3px] bg-paper-accent/10 px-3 py-2 text-xs leading-relaxed text-paper-ink"
        >
          <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-paper-accent" />
          <span>
            Te enviamos un enlace a{' '}
            <span className="break-all font-semibold">{email.trim()}</span>. Revisa tu correo y la
            carpeta de spam; caduca en 15 minutos.
          </span>
        </p>
      ) : null}

      {errorMessage ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-[3px] bg-danger-soft px-3 py-2 text-xs leading-relaxed text-danger"
        >
          <AlertIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </p>
      ) : null}

      <Button type="submit" disabled={sending} className="mt-2 w-full py-3">
        {sending ? (
          <>
            <LoaderIcon className="h-4 w-4 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            <MailIcon className="h-4 w-4" />
            {sent ? 'Enviar de nuevo' : 'Enviar enlace'}
          </>
        )}
      </Button>
    </form>
  )
}
