/** Esqueleto de la vista de mes mientras llega `GET /api/evento/all`. */
export function CalendarSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="mb-3 h-9 w-48 rounded-full bg-desk/60" />
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-[4px] border border-paper-line bg-paper-line">
        {Array.from({ length: 42 }, (_, index) => (
          <div key={index} className="h-[4.75rem] bg-paper sm:h-[6.75rem]" />
        ))}
      </div>
    </div>
  )
}
