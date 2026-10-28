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
  updatedAt: string
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void
  onContentChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

/** Lienzo de escritura: fecha, título, contenido y atajos cuando está vacío. */
export function NoteEditorBody({
  title,
  content,
  updatedAt,
  onTitleChange,
  onContentChange,
}: NoteEditorBodyProps) {
  const edited = formatRelativeDate(updatedAt)
  const empty = content.trim().length === 0

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-6 sm:px-10">
        <p className="text-xs text-muted">{edited ? `Editado ${edited}` : 'Sin fecha de edición'}</p>

        <input
          value={title}
          onChange={onTitleChange}
          placeholder="Título"
          aria-label="Título de la nota"
          className="mt-8 w-full bg-transparent text-3xl font-bold tracking-tight text-ink placeholder:text-muted/45 focus:outline-none sm:text-4xl"
        />

        <textarea
          value={content}
          onChange={onContentChange}
          placeholder="Empieza a escribir, arrastra archivos o usa una plantilla…"
          aria-label="Contenido de la nota"
          rows={4}
          className="mt-3 min-h-36 w-full resize-none bg-transparent text-[15px] leading-relaxed text-ink placeholder:text-muted/50 focus:outline-none field-sizing-content"
        />

        {empty && (
          <div className="mt-8 space-y-7">
            <section>
              <h2 className="text-xs font-medium text-muted">Empieza con un prompt de IA</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {aiPrompts.map((prompt) => (
                  <button key={prompt.label} type="button" onClick={soon} className={CHIP_CLASS}>
                    <span aria-hidden>{prompt.emoji}</span>
                    {prompt.label}
                  </button>
                ))}
              </div>
              <button type="button" onClick={soon} className={cn(CHIP_CLASS, 'mt-2')}>
                <SparkleIcon className="h-3.5 w-3.5" />
                Más prompts de IA
              </button>
            </section>

            <section>
              <h2 className="text-xs font-medium text-muted">Empieza desde una plantilla</h2>
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
    </div>
  )
}
