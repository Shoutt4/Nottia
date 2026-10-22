import { useEffect, useRef, useState } from 'react'

import { LinkIcon, NoteIcon, ShieldIcon } from '@/components/ui/icons'
import { toast } from '@/lib/toast'

import { copyToClipboard, noteShareUrl } from '../lib/share'

interface ShareButtonProps {
  noteId: string
  title: string
  content: string
}

const ITEM_CLASS =
  'flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors duration-200 hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const ICON_WRAP_CLASS = 'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-canvas text-muted'

/**
 * Menú de compartir propio (sin la hoja del sistema): copiar el enlace de la
 * nota o su contenido como texto. Todo ocurre en el navegador.
 */
export function ShareButton({ noteId, title, content }: ShareButtonProps) {
  const [open, setOpen] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstItemRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (open) firstItemRef.current?.focus()
  }, [open])

  const copy = async (text: string, message: string) => {
    setOpen(false)

    const copied = await copyToClipboard(text)
    if (copied) toast.success(message)
    else toast.error('No pudimos copiar al portapapeles.')
  }

  const copyLink = () => copy(noteShareUrl(noteId), 'Enlace copiado.')

  const copyText = () => {
    const text = [title.trim() || 'Sin título', '', content].join('\n').trim()
    copy(text, 'Nota copiada como texto.')
  }

  return (
    <div ref={rootRef} className="relative">
      <div className="flex shrink-0 items-center overflow-hidden rounded-full bg-accent text-on-accent">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="menu"
          aria-expanded={open}
          title="Compartir nota"
          className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Compartir
        </button>

        <span aria-hidden className="h-5 w-px bg-on-accent/30" />

        <button
          type="button"
          onClick={copyLink}
          aria-label="Copiar enlace de la nota"
          title="Copiar enlace"
          className="grid h-8 w-8 place-items-center transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <LinkIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      {open && (
        <div
          role="menu"
          aria-label="Compartir nota"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 animate-rise rounded-2xl border border-line bg-surface p-1.5 shadow-2xl"
        >
          <button
            ref={firstItemRef}
            type="button"
            role="menuitem"
            onClick={copyLink}
            className={ITEM_CLASS}
          >
            <span aria-hidden className={ICON_WRAP_CLASS}>
              <LinkIcon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-ink">Copiar enlace</span>
              <span className="block text-[11px] leading-snug text-muted">
                Para quien tenga acceso a la nota.
              </span>
            </span>
          </button>

          <button type="button" role="menuitem" onClick={copyText} className={ITEM_CLASS}>
            <span aria-hidden className={ICON_WRAP_CLASS}>
              <NoteIcon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-ink">Copiar como texto</span>
              <span className="block text-[11px] leading-snug text-muted">
                Título y contenido de la nota.
              </span>
            </span>
          </button>

          <p className="mt-1 flex items-start gap-1.5 border-t border-line px-2.5 pb-1 pt-2 text-[11px] leading-snug text-muted">
            <ShieldIcon className="mt-px h-3.5 w-3.5 shrink-0" />
            El enlace no es público: requiere iniciar sesión con una cuenta con acceso.
          </p>
        </div>
      )}
    </div>
  )
}
