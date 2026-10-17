import { Avatar } from '@/components/ui/Avatar'
import { SparkleIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { getCurrentUser } from '@/config'

import { QuickStartCard } from '../components/QuickStartCard'
import { quickActions } from '../data'

/** Inicio de la zona privada (dentro del SidebarLayout). */
export function WelcomePage() {
  const user = getCurrentUser()
  const name = user.nombre ?? 'Tu cuenta'
  const firstName = user.nombre?.trim().split(/\s+/)[0]

  return (
    <div>
      <Reveal>
        <div className="flex items-center gap-3">
          <Avatar name={name} src={user.avatarUrl} showStatus className="h-11 w-11 text-sm" />
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur">
            <SparkleIcon className="h-4 w-4 text-accent" />
            Sesión iniciada
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
          {firstName ? `¡Hola, ${firstName}! 👋` : '¡Bienvenido a Nottia! 👋'}
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-muted">
          Este es tu espacio para todo lo que quieres recordar. Aquí vivirá tu contenido; por ahora
          te dejamos una vista rápida de lo que viene.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action, index) => (
          <Reveal key={action.id} delay={80 + index * 70} className="h-full">
            <QuickStartCard action={action} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={160}>
        <div className="mt-10 rounded-3xl border border-dashed border-line bg-surface/60 px-6 py-10 text-center">
          <p className="text-sm font-semibold text-ink">Página de bienvenida temporal</p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Sustituiremos este contenido por el dashboard real cuando conectemos el resto de la API.
          </p>
        </div>
      </Reveal>
    </div>
  )
}
