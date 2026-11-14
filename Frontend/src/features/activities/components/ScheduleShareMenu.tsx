import { useEffect, useRef, useState } from 'react'

import { DownloadIcon, LinkIcon, PrinterIcon } from '@/components/ui/icons'
import { buttonClass } from '@/components/ui/buttonStyles'
import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'

import { downloadScheduleImage } from '../lib/scheduleImage'
import {
  copyText,
  saveSharePayload,
  scheduleShareUrl,
  toSharePayload,
} from '../lib/share'
import type { Activity } from '../types'

interface ScheduleShareMenuProps {
  activities: Activity[]
}

const ITEM_CLASS =
  'flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors duration-200 hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const ICON_WRAP_CLASS =
  'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-canvas text-muted'

/** Compartir la planificación: pestaña aparte, PDF, PNG o enlace. */
export function ScheduleShareMenu({ activities }: ScheduleShareMenuProps) {
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

  const openShareTab = (print = false) => {
    const payload = toSharePayload(activities)
    saveSharePayload(payload)
    window.open(scheduleShareUrl(payload, print), '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  const downloadImage = async () => {
    setOpen(false)

    try {
      await downloadScheduleImage(activities, 'Mi semana')
      toast.success('Imagen descargada.')
    } catch (error) {
      toast.error(getErrorMessage(error instanceof Error ? error : null))
    }
  }

  const copyLink = async () => {
    const payload = toSharePayload(activities)
    saveSharePayload(payload)
    setOpen(false)

    const copied = await copyText(scheduleShareUrl(payload))
    if (copied) toast.success('Enlace copiado.')
    else toast.error('No pudimos copiar el enlace.')
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={buttonClass('secondary', 'gap-2')}
      >
        <LinkIcon className="h-4 w-4" />
        Compartir
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Compartir planificación"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 animate-rise rounded-2xl border border-line bg-surface p-1.5 shadow-2xl"
        >
          <button
            ref={firstItemRef}
            type="button"
            role="menuitem"
            onClick={() => openShareTab(false)}
            className={ITEM_CLASS}
          >
            <span aria-hidden className={ICON_WRAP_CLASS}>
              <LinkIcon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-ink">Abrir en otra pestaña</span>
              <span className="block text-[11px] leading-snug text-muted">
                Vista limpia para enseñar o compartir.
              </span>
            </span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => openShareTab(true)}
            className={ITEM_CLASS}
          >
            <span aria-hidden className={ICON_WRAP_CLASS}>
              <PrinterIcon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-ink">Guardar como PDF</span>
              <span className="block text-[11px] leading-snug text-muted">
                Abre la impresión del navegador en horizontal.
              </span>
            </span>
          </button>

          <button type="button" role="menuitem" onClick={downloadImage} className={ITEM_CLASS}>
            <span aria-hidden className={ICON_WRAP_CLASS}>
              <DownloadIcon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-ink">Descargar imagen</span>
              <span className="block text-[11px] leading-snug text-muted">
                PNG con todo el cuadro semanal.
              </span>
            </span>
          </button>

          <button type="button" role="menuitem" onClick={copyLink} className={ITEM_CLASS}>
            <span aria-hidden className={ICON_WRAP_CLASS}>
              <LinkIcon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-ink">Copiar enlace</span>
              <span className="block text-[11px] leading-snug text-muted">
                Lleva la planificación dentro del enlace.
              </span>
            </span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
