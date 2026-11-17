import { Logo } from '@/components/brand/Logo'
import { BellIcon, LinkIcon, SearchIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

import { SectionHeading } from './SectionHeading'

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

const CHIPS = ['Notas', 'Listas', 'Calendario', 'Mapa', 'Kanban']

/** Mockup de teléfono con la app Nottia (puramente decorativo). */
export function Showcase() {
  return (
    <section id="en-tu-bolsillo" className="relative overflow-hidden px-5 py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-paper-accent/20"
      />

      <Reveal>
        <SectionHeading
          eyebrow="En tu bolsillo"
          title="Lo importante, siempre a mano."
          description="Una libreta que cabe en tu bolsillo y te sigue a todas partes. Las mismas notas, el mismo orden, otra pantalla."
          align="center"
        />
      </Reveal>

      <Reveal delay={120}>
        <div className="relative mx-auto mt-14 w-[290px] max-w-full sm:w-[320px]">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[3rem] bg-paper-accent/10 blur-3xl"
          />

          <div
            aria-hidden
            className="absolute -left-40 top-24 hidden w-40 rotate-[-6deg] md:block"
          >
            <div
              className="animate-float rounded-[4px] border border-[#e2d2b6] bg-[#f5eddc] p-3 shadow-[0_20px_40px_-24px_rgba(35,28,20,0.65)] motion-reduce:animate-none"
              style={{ animationDelay: '1s' }}
            >
              <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-[#8a7f70]">
                <BellIcon className="h-3 w-3" />
                Recordatorio
              </span>
              <p className="mt-2 font-serif text-sm font-semibold leading-tight text-[#2a241d]">
                Revisar la lista
                <br />
                antes del viernes.
              </p>
              <span aria-hidden className="mt-3 block h-1 w-12 rounded-full bg-[#9a6b2f]/25" />
            </div>
          </div>

          <div
            aria-hidden
            className="absolute -right-44 bottom-24 hidden w-44 rotate-[5deg] md:block"
          >
            <div
              className="animate-float rounded-[4px] border border-[#c9d8cd] bg-[#e9f0e8] p-3 shadow-[0_20px_40px_-24px_rgba(35,28,20,0.65)] motion-reduce:animate-none"
              style={{ animationDelay: '2.2s' }}
            >
              <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-[#63836f]">
                <LinkIcon className="h-3 w-3" />
                Enlace público
              </span>
              <p className="mt-2 font-serif text-sm font-semibold leading-tight text-[#2a241d]">
                Nota compartida
              </p>
              <p className="mt-1 text-[10px] leading-snug text-[#6b6156]">
                Solo lectura. Tú decides qué se ve.
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="relative rounded-[2.75rem] border border-[#17131f] bg-[#241d38] p-2.5 shadow-[0_50px_90px_-40px_rgba(18,12,34,0.7)]"
          >
            <span
              aria-hidden
              className="absolute -right-2 -top-2 h-7 w-7 rounded-full border border-white/20 bg-[#3b3152] shadow-lg"
            />
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

      <Reveal delay={220}>
        <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-2">
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-paper-line bg-paper/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
            >
              {chip}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
