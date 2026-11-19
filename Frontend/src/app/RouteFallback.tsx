/** Placeholder mientras se descarga el chunk de una ruta diferida. */
export function RouteFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8" aria-busy="true">
      <div className="animate-pulse space-y-4">
        <div className="h-3 w-24 rounded-full bg-line" />
        <div className="h-12 w-64 rounded-lg bg-line" />
        <div className="h-[58vh] rounded-[6px] border border-line bg-surface" />
      </div>
    </div>
  )
}
