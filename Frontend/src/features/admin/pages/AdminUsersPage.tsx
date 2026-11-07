import { useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { ChevronRightIcon, ShieldIcon, UsersIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { getErrorMessage } from '@/lib/errors'

import { AdminUsersList } from '../components/AdminUsersList'
import { AdminUsersPagination } from '../components/AdminUsersPagination'
import { AdminUsersSkeleton } from '../components/AdminUsersSkeleton'
import { useAdminUsers } from '../hooks/useAdminUsers'

/** Gestión de usuarios del panel de administración (`GET /api/usuarios/all`). */
export function AdminUsersPage() {
  const [page, setPage] = useState(0)
  const listTopRef = useRef<HTMLElement>(null)
  const { data, isPending, isError, isFetching, error, refetch } = useAdminUsers(page)

  const users = data?.content ?? []
  const total = data?.totalElements ?? 0
  const totalPages = data?.totalPages ?? 0
  const hasUsers = users.length > 0
  const countLabel = isPending || isError ? '—' : String(total)

  const changePage = (next: number) => {
    setPage(next)
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="note-desk -mb-8 pb-10">
      <div className="note-paper border-y border-paper-line px-5 py-7 sm:px-10 sm:py-9 lg:px-14 2xl:px-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-line pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-paper-accent" />
              Panel de administración
            </span>

            <nav
              aria-label="Ruta"
              className="flex items-center gap-1.5 text-[9px] tracking-[0.16em]"
            >
              <span>Administrador</span>
              <ChevronRightIcon className="h-3 w-3 text-paper-accent/60" />
              <span className="text-paper-ink">Usuarios</span>
            </nav>
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper-accent">
                Gestión de cuentas
              </p>
              <h1 className="mt-2 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-paper-ink sm:text-5xl">
                Gestión de usuarios
              </h1>
              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-paper-muted">
                Consulta las cuentas registradas en Nottia. La información llega paginada desde el
                servidor.
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Reveal delay={60}>
            <article className="relative overflow-hidden rounded-[4px] border border-paper-line bg-desk/40 p-5 sm:p-6">
              <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-paper-accent/70" />
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-muted">
                Cuentas de usuario
              </p>
              <p className="mt-2 font-serif text-4xl font-semibold tracking-[-0.02em] text-paper-ink">
                {countLabel}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-paper-muted">
                Registros con rol de usuario en la plataforma.
              </p>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="relative overflow-hidden rounded-[4px] border border-paper-line bg-desk/40 p-5 sm:p-6">
              <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-paper-accent/40" />
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-muted">
                  Rol de la sesión
                </p>
                <ShieldIcon className="h-4 w-4 text-paper-accent" />
              </div>
              <p className="mt-2 font-serif text-2xl font-semibold tracking-[-0.01em] text-paper-ink">
                Administrador
              </p>
              <p className="mt-1 text-xs leading-relaxed text-paper-muted">
                Acceso completo al panel de administración.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <section ref={listTopRef} className="mt-8 scroll-mt-24" aria-busy={isPending || isFetching}>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-3 border-b border-paper-line pb-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-muted">
                  Directorio
                </p>
                <h2 className="mt-1 font-serif text-2xl font-semibold tracking-[-0.01em] text-paper-ink">
                  Todas las cuentas
                </h2>
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-muted">
                {totalPages > 0 ? `Página ${page + 1} de ${totalPages}` : 'Sin páginas'}
              </span>
            </div>

            {isPending ? (
              <AdminUsersSkeleton />
            ) : isError ? (
              <div className="rounded-[4px] border border-paper-line bg-desk/30 px-6 py-12 text-center">
                <p className="font-serif text-2xl font-semibold text-paper-ink">
                  No pudimos cargar los usuarios
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
            ) : hasUsers ? (
              <>
                <AdminUsersList users={users} />
                <AdminUsersPagination
                  page={page}
                  totalPages={totalPages}
                  onChange={changePage}
                  disabled={isFetching}
                />
              </>
            ) : (
              <div className="rounded-[4px] border border-paper-line bg-desk/30 px-6 py-14 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-paper-line bg-paper text-paper-accent">
                  <UsersIcon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-serif text-2xl font-semibold text-paper-ink">
                  Todavía no hay usuarios
                </p>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-pretty text-paper-muted">
                  Cuando alguien cree una cuenta en Nottia, aparecerá en este directorio.
                </p>
              </div>
            )}

            <p className="mt-5 text-xs leading-relaxed text-paper-muted">
              Solo se muestran cuentas con rol de usuario. La edición de cuentas estará disponible
              más adelante.
            </p>
          </section>
        </Reveal>
      </div>
    </div>
  )
}
