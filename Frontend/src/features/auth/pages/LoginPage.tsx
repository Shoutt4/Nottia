import { Link } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

import { AuthLayout } from '../components/AuthLayout'
import { LoginForm } from '../components/LoginForm'

const perks = [
  'Tus notas en todos tus dispositivos',
  'Listas, recordatorios y calendario',
  'Privado, compartido o público',
]

export function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Bienvenido de vuelta"
      heading="Lo importante, siempre a mano."
      description="Inicia sesión para continuar donde lo dejaste: tus notas, listas y recordatorios te esperan."
      perks={perks}
    >
      <h1 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-paper-ink">
        Inicia sesión
      </h1>
      <p className="mt-2 text-sm text-paper-muted">Bienvenido de vuelta a Nottia.</p>

      <LoginForm />

      <p className="mt-7 text-center text-sm text-paper-muted">
        ¿No tienes cuenta?{' '}
        <Link
          to={ROUTES.register}
          className="font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Crear cuenta
        </Link>
      </p>
    </AuthLayout>
  )
}
