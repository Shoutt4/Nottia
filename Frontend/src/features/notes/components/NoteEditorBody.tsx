import type { ChangeEvent } from 'react'

import { ArrowRightIcon, NoteIcon, SparkleIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

import { CHIP_CLASS } from '../lib/editorClasses'
import { formatRelativeDate } from '../lib/format'
import { aiPrompts } from '../lib/prompts'
import { soon } from '../lib/soon'

interface NoteEditorBodyProps {
  title: string
  content: string
  notebook: string
  updatedAt: string
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void
  onContentChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

/** Hoja de escritura: una página de papel sobre la mesa del editor. */
export function NoteEditorBody({
  title,
  content,
  notebook,
  updatedAt,
  onTitleChange,
  onContentChange,
}: NoteEditorBodyProps) {
  const edited = formatRelativeDate(updatedAt)
  const empty = content.trim().length === 0

  return (
    <div className="note-desk scroll-slim flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-[880px] px-3 py-5 sm:px-8 sm:py-8">
        <article className="note-paper relative min-h-[560px] overflow-hidden rounded-[3px] border border-paper-line px-5 py-7 text-paper-ink shadow-[0_30px_70px_-42px_rgba(35,28,20,0.65)] sm:min-h-[720px] sm:px-10 sm:py-12">
          <span
            aria-hidden
            className="absolute inset-y-8 left-4 w-px bg-paper-accent/40 sm:inset-y-12 sm:left-8"
          />

          <div className="relative pl-6 sm:pl-12">
            <div className="flex items-center justify-between gap-4 border-b border-paper-line pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
              <span className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-paper-accent"
                />
                <span className="truncate">Cuaderno · {notebook || 'Notas'}</span>
              </span>
              <span className="shrink-0">
                {edited ? `Editado ${edited}` : 'Hoja sin fecha'}
              </span>
            </div>

            <input
              value={title}
              onChange={onTitleChange}
              placeholder="Título de la hoja"
              aria-label="Título de la nota"
              className="mt-9 w-full bg-transparent font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-paper-ink placeholder:text-paper-muted/45 focus:outline-none sm:mt-10 sm:text-5xl"
            />

            <span aria-hidden className="mt-5 block h-px w-14 bg-paper-accent/70" />

            <textarea
              value={content}
              onChange={onContentChange}
              placeholder="Empieza a escribir en esta hoja…"
              aria-label="Contenido de la nota"
              rows={4}
              className="mt-6 min-h-[240px] w-full resize-none bg-transparent font-serif text-[17px] leading-[1.85] text-paper-ink placeholder:text-paper-muted/55 focus:outline-none field-sizing-content"
            />

            {empty && (
              <div className="mt-10 space-y-7">
                <section>
                  <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-muted">
                    Empieza con un prompt de IA
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {aiPrompts.map((prompt) => (
                      <button
                        key={prompt.label}
                        type="button"
                        onClick={soon}
                        className={CHIP_CLASS}
                      >
                        <span aria-hidden>{prompt.emoji}</span>
                        {prompt.label}
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={soon} className={cn(CHIP_CLASS, 'mt-3')}>
                    <SparkleIcon className="h-3.5 w-3.5" />
                    Más prompts de IA
                  </button>
                </section>

                <section>
                  <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-muted">
                    Empieza desde una plantilla
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={soon} className={CHIP_CLASS}>
                      <NoteIcon className="h-3.5 w-3.5" />
                      Mis plantillas
                    </button>
                    <button type="button" onClick={soon} className={CHIP_CLASS}>
                      Descubrir más plantillas
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </section>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
