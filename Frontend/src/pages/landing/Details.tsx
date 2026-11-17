import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

import { SectionHeading } from './SectionHeading'
import { details } from './data'

export function Details() {
  return (
    <section
      id="detalles"
      className="relative overflow-hidden border-y border-paper-line bg-desk/45 py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="paper-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Los detalles"
              title="Pequeñas cosas que hacen la diferencia."
              description="No todo es una función enorme. A veces lo que más se agradece es que el papel no te grite."
            />
            <div className="hidden shrink-0 rotate-[-3deg] border border-paper-line bg-paper/70 px-4 py-3 font-mono text-[8px] uppercase leading-relaxed tracking-[0.16em] text-paper-muted shadow-[0_14px_30px_-24px_rgba(35,28,20,0.55)] sm:block">
              Incluido en tu
              <br />
              cuaderno
              <span aria-hidden className="mt-2 block h-px w-12 bg-paper-accent/50" />
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {details.map((detail, index) => {
            const { Icon } = detail

            return (
              <Reveal key={detail.id} delay={index * 70} className="h-full">
                <article
                  className={cn(
                    'group relative flex h-full flex-col rounded-[3px] border p-5 shadow-[0_16px_28px_-24px_rgba(35,28,20,0.55)] transition duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_24px_38px_-24px_rgba(35,28,20,0.6)]',
                    detail.cardClass,
                    index % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.6deg]',
                  )}
                >
                  <span
                    aria-hidden
                    className="tape absolute -top-2 right-5 h-5 w-14 rotate-[2deg] rounded-[2px] opacity-80"
                  />

                  <span className="grid h-10 w-10 place-items-center rounded-full border border-black/5 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    <Icon className={cn('h-4 w-4', detail.iconClass)} />
                  </span>

                  <h3 className="mt-4 font-serif text-lg font-semibold text-[#2a241d]">
                    {detail.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b6156]">
                    {detail.description}
                  </p>

                  <div className="mt-auto pt-5">
                    <span aria-hidden className="block h-px w-full bg-[#2a241d]/10" />
                    <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-[#8a7f70]">
                      Nottia · detalle {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
