/** Tarjeta de relleno mientras se carga la siguiente tanda del carrusel. */
export function NoteCardSkeleton() {
  return (
    <div
      aria-hidden
      className="h-80 w-52 shrink-0 animate-pulse rounded-2xl border border-line bg-surface p-4"
    >
      <div className="h-2.5 w-16 rounded-full bg-line" />
      <div className="mt-3 h-3.5 w-32 rounded-full bg-line" />
      <div className="mt-4 space-y-2">
        <div className="h-2 w-full rounded-full bg-line" />
        <div className="h-2 w-11/12 rounded-full bg-line" />
        <div className="h-2 w-10/12 rounded-full bg-line" />
        <div className="h-2 w-9/12 rounded-full bg-line" />
      </div>
      <div className="mt-6 h-2 w-14 rounded-full bg-line" />
    </div>
  )
}
