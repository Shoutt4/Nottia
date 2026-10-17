import { Logo } from '@/components/brand/Logo'
import { SearchIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

type Tone = 'accent' | 'amber' | 'danger' | 'mint'

const toneClass: Record<Tone, string> = {
  accent: 'border-accent/25 bg-accent-soft',
  amber: 'border-accent-3/30 bg-accent-3/10',
  danger: 'border-danger/30 bg-danger-soft',
  mint: 'border-accent-2/30 bg-accent-2/10',
}

interface NoteCardProps {
  tone: Tone
  title: string
  body: string
  tag?: string
}

function NoteCard({ tone, title, body, tag }: NoteCardProps) {
  return (
    <div className={cn('flex flex-col gap-2 rounded-2xl border p-3', toneClass[tone])}>
      <p className="text-[11px] font-semibold leading-tight text-ink">{title}</p>
      <p className="text-[10px] leading-snug text-muted">{body}</p>
      {tag && (
        <span className="mt-auto w-fit rounded-full bg-ink/80 px-2 py-0.5 text-[9px] font-semibold text-canvas">
          {tag}
        </span>
      )}
    </div>
  )
}

/** Mockup de teléfono con la app Nottia (puramente decorativo). */
export function Showcase() {
  return (
    <section className="relative overflow-hidden px-5 pb-24">
      <Reveal>
        <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Lo importante, siempre a mano.
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div className="relative mx-auto w-[290px] sm:w-[320px]">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[3rem] bg-accent/20 blur-3xl"
          />

          <div className="relative rounded-[2.75rem] border border-line bg-surface p-2.5 shadow-[0_50px_90px_-40px_rgba(0,0,0,0.6)]">
            <div className="relative overflow-hidden rounded-[2.25rem] bg-canvas">
              <div
                aria-hidden
                className="absolute left-1/2 top-2.5 h-5 w-24 -translate-x-1/2 rounded-full bg-ink/90"
              />

              <div className="flex items-center justify-between px-5 pb-2 pt-4 text-[11px] font-semibold text-ink">
                <span>9:41</span>
                <span aria-hidden className="flex items-center gap-1">
                  <span className="h-2.5 w-4 rounded-[3px] border border-muted" />
                  <span className="h-2.5 w-5 rounded-[3px] border border-muted" />
                </span>
              </div>

              <div className="flex items-center justify-between px-4 pb-3">
                <span className="flex items-center gap-2">
                  <Logo size={20} />
                  <span className="text-sm font-bold text-ink">Nottia</span>
                </span>
                <span className="flex items-center gap-2 text-muted">
                  <SearchIcon className="h-4 w-4" />
                  <span aria-hidden className="h-6 w-6 rounded-full bg-accent-soft" />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 px-4 pb-7">
                <NoteCard
                  tone="amber"
                  title="Cosas que me gustaría gritar sin contexto"
                  body="¡NO ERA POR AHÍ, RAÚL!"
                />
                <NoteCard
                  tone="danger"
                  title="Pendiente urgente"
                  body="Llamar a… alguien. Seguro que me olvido si no lo anoto."
                  tag="Urgente"
                />
                <NoteCard tone="accent" title="Ideas sueltas" body="Una app para recordar lo que importa." tag="Nueva" />
                <NoteCard tone="mint" title="Fin de semana" body="Comprar pan, café y calma." />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
