import { Logo } from '@/components/brand/Logo'
import { SearchIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

type Tone = 'accent' | 'amber' | 'danger' | 'mint'

const toneClass: Record<Tone, string> = {
  accent: 'border-[#d9c3b6] bg-[#f4e7dd]',
  amber: 'border-[#e2d2b6] bg-[#f5eddc]',
  danger: 'border-[#e3c4c0] bg-[#f6e5e2]',
  mint: 'border-[#c9d8cd] bg-[#e9f0e8]',
}

interface NoteCardProps {
  tone: Tone
  title: string
  body: string
  tag?: string
}

function NoteCard({ tone, title, body, tag }: NoteCardProps) {
  return (
    <div className={cn('flex flex-col gap-2 rounded-[4px] border p-3', toneClass[tone])}>
      <p className="text-[11px] font-semibold leading-tight text-[#2a241d]">{title}</p>
      <p className="text-[10px] leading-snug text-[#6b6156]">{body}</p>
      {tag && (
        <span className="mt-auto w-fit rounded-full bg-[#241f1a] px-2 py-0.5 text-[9px] font-semibold text-[#fbf7ee]">
          {tag}
        </span>
      )}
    </div>
  )
}

/** Mockup de teléfono con la app Nottia (puramente decorativo). */
export function Showcase() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-20 sm:pb-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-accent">
            En tu bolsillo
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-[-0.02em] text-paper-ink sm:text-4xl">
            Lo importante, siempre a mano.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-paper-muted">
            Una libreta que cabe en tu bolsillo y te sigue a todas partes.
          </p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="relative mx-auto mt-12 w-[290px] sm:w-[320px]">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[3rem] bg-paper-accent/10 blur-3xl"
          />

          <div className="relative rounded-[2.75rem] border border-[#17131f] bg-[#241d38] p-2.5 shadow-[0_50px_90px_-40px_rgba(18,12,34,0.7)]">
            <div className="relative overflow-hidden rounded-[2.25rem] bg-[#fbf7ee]">
              <div
                aria-hidden
                className="absolute left-1/2 top-2.5 h-5 w-24 -translate-x-1/2 rounded-full bg-[#241d38]"
              />

              <div className="flex items-center justify-between px-5 pb-2 pt-4 text-[11px] font-semibold text-[#2a241d]">
                <span>9:41</span>
                <span aria-hidden className="flex items-center gap-1">
                  <span className="h-2.5 w-4 rounded-[3px] border border-[#8a7f70]" />
                  <span className="h-2.5 w-5 rounded-[3px] border border-[#8a7f70]" />
                </span>
              </div>

              <div className="flex items-center justify-between px-4 pb-3">
                <span className="flex items-center gap-2">
                  <Logo size={20} />
                  <span className="font-serif text-sm font-semibold text-[#2a241d]">Nottia</span>
                </span>
                <span className="flex items-center gap-2 text-[#8a7f70]">
                  <SearchIcon className="h-4 w-4" />
                  <span aria-hidden className="h-6 w-6 rounded-full bg-[#e7dfd2]" />
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
                <NoteCard
                  tone="accent"
                  title="Ideas sueltas"
                  body="Una app para recordar lo que importa."
                  tag="Nueva"
                />
                <NoteCard tone="mint" title="Fin de semana" body="Comprar pan, café y calma." />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
