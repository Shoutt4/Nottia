import { useState } from 'react'
import type { FormEvent } from 'react'

import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, InfoIcon, MailIcon } from '@/components/ui/icons'
import { toast } from '@/lib/toast'

import { FormField } from './FormField'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Vista previa del formulario de recuperación: todavía no llama al backend. */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!EMAIL_RE.test(email.trim())) {
      setError('Escribe un correo válido.')
      return
    }

    setError(undefined)
    toast.info('La recuperación de contraseña estará disponible pronto.')
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-7 space-y-4">
      <FormField
        id="recovery-email"
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(value) => {
          setEmail(value)
          if (error) setError(undefined)
        }}
        error={error}
        autoComplete="email"
        maxLength={200}
        icon={<MailIcon className="h-5 w-5" />}
      />

      <Button type="submit" className="mt-2 w-full py-3">
        Enviar enlace
        <ArrowRightIcon className="h-4 w-4" />
      </Button>

      <p className="flex items-start gap-2 rounded-[3px] bg-paper-accent/[0.06] px-3 py-2 text-xs leading-relaxed text-paper-muted">
        <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-paper-accent" />
        <span>
          La recuperación estará disponible muy pronto. Estamos terminando los últimos detalles.
        </span>
      </p>
    </form>
  )
}
