/** Esqueleto de carga de la página de cuenta. */
export function ProfileSkeleton() {
  return (
    <div className="space-y-5">
      <div className="h-[104px] animate-pulse rounded-3xl border border-line bg-surface" />

      <div className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
        <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
          <div className="mx-auto h-28 w-28 animate-pulse rounded-full bg-line sm:h-36 sm:w-36" />

          <div className="space-y-5">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="space-y-2">
                <div className="h-3 w-28 animate-pulse rounded bg-line" />
                <div className="h-3.5 w-52 animate-pulse rounded bg-line" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
