import { AuthLayout } from '../components/AuthLayout'
import { RegisterForm } from '../components/RegisterForm'

const perks = [
  'Tus notas en todos tus dispositivos',
  'Listas, recordatorios y calendario',
  'Privado, compartido o público',
]

export function RegisterPage() {
  return (
    <AuthLayout
      eyebrow="Empieza gratis"
      heading="Tus ideas, ordenadas desde el primer día."
      description="Crea tu cuenta para guardar notas, listas y recordatorios. Todo sincronizado, privado y a tu manera."
      perks={perks}
    >
      <RegisterForm />
    </AuthLayout>
  )
}
