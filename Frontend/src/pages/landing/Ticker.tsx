const ITEMS = [
  'Notas con textura',
  'Listas que respiran',
  'Calendario',
  'Mapa',
  'Kanban',
  'Recordatorios',
  'Enlaces privados',
  'Tu cuaderno',
]

function TickerGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center gap-7 px-7">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-7 whitespace-nowrap">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-muted">
            {item}
          </span>
          <span aria-hidden className="h-1 w-1 rotate-45 bg-paper-accent/70" />
        </span>
      ))}
    </div>
  )
}

/** Cinta de palabras que se desliza entre el hero y las funciones. */
export function Ticker() {
  return (
    <div className="overflow-hidden border-y border-paper-line bg-paper/90 py-3.5">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <TickerGroup />
        <TickerGroup hidden />
      </div>
    </div>
  )
}
