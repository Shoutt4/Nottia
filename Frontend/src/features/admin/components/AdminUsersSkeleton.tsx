const ROWS = [0, 1, 2, 3, 4]

/** Esqueleto de carga del directorio de usuarios. */
export function AdminUsersSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="overflow-hidden rounded-[4px] border border-paper-line bg-paper/70"
    >
      <span className="sr-only">Cargando usuarios…</span>

      <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] gap-5 border-b border-paper-line bg-desk/35 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted sm:grid">
        <span>Usuario</span>
        <span>Contacto</span>
        <span>Identificador</span>
      </div>

      <ul className="divide-y divide-paper-line">
        {ROWS.map((row) => (
          <li key={row} className="px-5 py-4">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] sm:items-center sm:gap-5">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-paper-line" />
                <div className="w-full space-y-2">
                  <span className="block h-3 w-32 max-w-full animate-pulse rounded bg-paper-line" />
                  <span className="block h-2 w-20 max-w-full animate-pulse rounded bg-paper-line" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="block h-3 w-40 max-w-full animate-pulse rounded bg-paper-line" />
                <span className="block h-2.5 w-24 max-w-full animate-pulse rounded bg-paper-line" />
              </div>

              <div className="space-y-2">
                <span className="block h-3 w-20 max-w-full animate-pulse rounded bg-paper-line" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
