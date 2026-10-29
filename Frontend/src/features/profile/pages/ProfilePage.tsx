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
    <div className="note-desk -mb-8 pb-10">
      <div className="note-paper border-y border-paper-line px-5 py-7 sm:px-10 sm:py-9 lg:px-14 2xl:px-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-line pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-paper-accent" />
              Archivo personal
            </span>

            <nav
              aria-label="Ruta"
              className="flex items-center gap-1.5 text-[9px] tracking-[0.16em]"
            >
              <span>Cuenta</span>
              <ChevronRightIcon className="h-3 w-3 text-paper-accent/60" />
              <span className="text-paper-ink">Resumen</span>
            </nav>
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper-accent">
                Ficha personal
              </p>
              <h1 className="mt-2 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-paper-ink sm:text-5xl">
                Información de la cuenta
              </h1>
              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-paper-muted">
                Tus datos personales y el estado de tu cuenta.
              </p>
            </div>

            <span
              aria-hidden
              className="hidden select-none font-serif text-6xl italic leading-none text-paper-line sm:block"
            >
              N.º 01
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 border-t border-paper-line pt-7 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          <AccountNav />

          <div className="min-w-0">
            {isPending ? (
              <ProfileSkeleton />
            ) : isError || !profile ? (
              <div className="rounded-[4px] border border-paper-line bg-desk/30 px-6 py-12 text-center">
                <p className="font-serif text-2xl font-semibold text-paper-ink">
                  No pudimos cargar tu cuenta
                </p>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-pretty text-paper-muted">
                  {getErrorMessage(error)}
                </p>
                <Button
                  variant="secondary"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="mt-5 rounded-md border-paper-line bg-paper text-paper-ink hover:border-paper-accent hover:text-paper-accent focus-visible:outline-paper-accent"
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
                  <section className="rounded-[4px] border border-paper-line bg-desk/30 p-5 sm:p-7">
                    <div className="mb-5 flex items-center justify-between gap-4 border-b border-paper-line pb-3">
                      <h2 className="font-serif text-xl font-semibold text-paper-ink">
                        Datos personales
                      </h2>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted">
                        Cuenta
                      </span>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8">
                      <div className="flex justify-center sm:justify-start">
                        <div className="rotate-[-2deg] rounded-[3px] border border-paper-line bg-paper p-2 shadow-[0_18px_35px_-28px_rgba(35,28,20,0.6)]">
                          <Avatar
                            name={name}
                            src={profile.urlAvatar}
                            className="h-28 w-28 rounded-full text-3xl sm:h-36 sm:w-36 sm:text-4xl"
                          />
                        </div>
                      </div>

                      <div className="divide-y divide-paper-line">
                        <ProfileField label="Nombre" value={name} onEdit={comingSoon} />
                        <ProfileField
                          label="Correo electrónico"
                          value={profile.email}
                          onEdit={comingSoon}
                        />
                        <ProfileField
                          label="Teléfono"
                          value={profile.phone ?? 'Sin registrar'}
                        />
                        <ProfileField
                          label="Miembro desde"
                          value={formatDate(profile.createAt)}
                        />
                      </div>
                    </div>
                  </section>
                </Reveal>

                <Reveal delay={180}>
                  <p className="flex items-start gap-2 text-xs leading-relaxed text-paper-muted">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-paper-accent"
                    />
                    Estos datos se obtienen directamente de tu cuenta en Nottia.
                  </p>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
