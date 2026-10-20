import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { ChevronRightIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'

import { AccountNav } from '../components/AccountNav'
import { PlanCard } from '../components/PlanCard'
import { ProfileField } from '../components/ProfileField'
import { ProfileSkeleton } from '../components/ProfileSkeleton'
import { useProfile } from '../hooks/useProfile'
import { formatDate, fullName } from '../lib/format'

/** Información de la cuenta: datos reales desde `GET /api/usuarios/me`. */
export function ProfilePage() {
  const { data: profile, isPending, isError, isFetching, error, refetch } = useProfile()

  const name = fullName(profile) || profile?.email || 'Tu cuenta'
  const comingSoon = () => toast.info('La edición de tus datos estará disponible pronto.')

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-5 sm:px-8">
      <Reveal>
        <nav aria-label="Ruta" className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <span>Cuenta</span>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-ink">Resumen de cuenta</span>
        </nav>

        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          Información de la cuenta
        </h1>
        <p className="mt-1 text-sm text-muted">Tus datos personales y el estado de tu cuenta.</p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-8">
        <AccountNav />

        <div className="min-w-0">
          {isPending ? (
            <ProfileSkeleton />
          ) : isError || !profile ? (
            <div className="rounded-3xl border border-line bg-surface px-6 py-12 text-center">
              <p className="text-sm font-semibold text-ink">No pudimos cargar tu cuenta</p>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-pretty text-muted">
                {getErrorMessage(error)}
              </p>
              <Button
                variant="secondary"
                onClick={() => refetch()}
                disabled={isFetching}
                className="mt-5"
              >
                {isFetching ? 'Reintentando…' : 'Reintentar'}
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              <Reveal delay={60}>
                <PlanCard />
              </Reveal>

              <Reveal delay={120}>
                <section className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
                  <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                    <div className="flex justify-center sm:block">
                      <Avatar
                        name={name}
                        src={profile.urlAvatar}
                        className="h-28 w-28 rounded-full text-3xl ring-4 ring-surface sm:h-36 sm:w-36 sm:text-4xl"
                      />
                    </div>

                    <div className="divide-y divide-line">
                      <ProfileField label="Nombre" value={name} onEdit={comingSoon} />
                      <ProfileField
                        label="Correo electrónico"
                        value={profile.email}
                        onEdit={comingSoon}
                      />
                      <ProfileField label="Teléfono" value={profile.phone ?? 'Sin registrar'} />
                      <ProfileField label="Miembro desde" value={formatDate(profile.createAt)} />
                    </div>
                  </div>
                </section>
              </Reveal>

              <Reveal delay={180}>
                <p className="text-center text-xs text-muted lg:text-left">
                  Estos datos se obtienen directamente de tu cuenta en Nottia.
                </p>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
