/** Esqueleto de carga de la página de cuenta. */
export function ProfileSkeleton() {
  return (
    <div className="space-y-5">
      <div className="h-[104px] animate-pulse rounded-[4px] border border-paper-line bg-desk/30" />

      <div className="rounded-[4px] border border-paper-line bg-desk/30 p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-paper-line pb-3">
          <div className="h-4 w-40 animate-pulse rounded bg-paper-line" />
          <div className="h-2.5 w-12 animate-pulse rounded bg-paper-line" />
        </div>

        <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8">
          <div className="flex justify-center sm:justify-start">
            <div className="rounded-[3px] border border-paper-line bg-paper p-2">
              <div className="h-28 w-28 animate-pulse rounded-full bg-paper-line sm:h-36 sm:w-36" />
            </div>
          </div>

          <div className="space-y-5">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="space-y-2">
                <div className="h-2.5 w-24 animate-pulse rounded bg-paper-line" />
                <div className="h-3.5 w-52 max-w-full animate-pulse rounded bg-paper-line" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
