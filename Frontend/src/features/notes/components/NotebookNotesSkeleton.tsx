/** Rejilla de notas de relleno mientras se carga una página del cuaderno. */
export function NotebookNotesSkeleton() {
  return (
    <div aria-hidden className="mt-6 grid gap-4 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="min-h-[184px] animate-pulse rounded-2xl border border-line bg-surface p-5"
        >
          <div className="h-2 w-16 rounded-full bg-line" />
          <div className="mt-4 h-4 w-2/3 rounded-full bg-line" />
          <div className="mt-3 space-y-2">
            <div className="h-2 w-full rounded-full bg-line" />
            <div className="h-2 w-11/12 rounded-full bg-line" />
            <div className="h-2 w-8/12 rounded-full bg-line" />
          </div>
          <div className="mt-8 h-2 w-20 rounded-full bg-line" />
        </div>
      ))}
    </div>
  )
}
