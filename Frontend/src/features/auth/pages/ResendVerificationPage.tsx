import { Link, useSearchParams } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

import { AuthLayout } from '../components/AuthLayout'
import { ResendVerificationForm } from '../components/ResendVerificationForm'

const perks = [
  'El enlace caduca en 15 minutos',
  'Si no aparece, revisa la carpeta de spam',
  'Tu cuenta y tus notas siguen intactas',
]

export function ResendVerificationPage() {
  const [params] = useSearchParams()
  const email = params.get('email')?.trim() ?? ''

  return (
    <AuthLayout
      eyebrow="Casi listo"
      heading="Un enlace nuevo, un paso menos."
      description="Tu cuenta sigue ahí; solo falta confirmar el correo. Pide un enlace nuevo para activarla y volver a tus notas."
      perks={perks}
      cardEyebrow="Verificación"
      cardNumber="N.º 02"
      coverNumber="N.º 02"
    >
      <h1 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-paper-ink">
        Reenviar verificación
      </h1>
      <p className="mt-2 text-sm text-paper-muted">
        Escribe el correo con el que te registraste y te enviaremos un enlace nuevo.
      </p>

      <ResendVerificationForm key={email} initialEmail={email} />

      <p className="mt-7 text-center text-sm text-paper-muted">
        ¿Ya está verificada?{' '}
        <Link
          to={ROUTES.login}
          className="font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Inicia sesión
        </Link>
      </p>
    </AuthLayout>
  )
}
