import { Link } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

import { AuthLayout } from '../components/AuthLayout'
import { ForgotPasswordForm } from '../components/ForgotPasswordForm'

const perks = [
  'Un enlace seguro para crear una contraseña nueva',
  'El enlace caduca en 15 minutos',
  'Tus notas siguen donde las dejaste',
]

export function ForgotPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Recupera el acceso"
      heading="Vuelve a tus notas sin perder el hilo."
      description="Olvidar la contraseña no tiene por qué cortar tu ritmo. Recupera tu cuenta con un enlace seguro y sigue donde lo dejaste."
      perks={perks}
      cardEyebrow="Recuperación"
      cardNumber="N.º 03"
      coverNumber="N.º 03"
    >
      <h1 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-paper-ink">
        Recuperar contraseña
      </h1>
      <p className="mt-2 text-sm text-paper-muted">
        Escribe el correo de tu cuenta y te enviaremos un enlace para crear una nueva.
      </p>

      <ForgotPasswordForm />

      <p className="mt-7 text-center text-sm text-paper-muted">
        ¿Ya la recordaste?{' '}
        <Link
          to={ROUTES.login}
          className="font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Volver a iniciar sesión
        </Link>
      </p>
    </AuthLayout>
  )
}
