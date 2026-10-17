import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { useToastStore } from '@/stores/toastStore'
import type { Toast as ToastModel, ToastVariant } from '@/stores/toastStore'

import { AlertIcon, CheckIcon, InfoIcon, XCircleIcon, XIcon } from './icons'

interface ToastProps {
  toast: ToastModel
}

const VARIANTS: Record<ToastVariant, { Icon: typeof CheckIcon; chip: string; bar: string }> = {
  success: { Icon: CheckIcon, chip: 'bg-accent-2/15 text-accent-2', bar: 'bg-accent-2' },
  error: { Icon: XCircleIcon, chip: 'bg-danger-soft text-danger', bar: 'bg-danger' },
  warning: { Icon: AlertIcon, chip: 'bg-accent-3/15 text-accent-3', bar: 'bg-accent-3' },
  info: { Icon: InfoIcon, chip: 'bg-accent-soft text-accent', bar: 'bg-accent' },
}

/** Un aviso. Se cierra solo (salvo `duration: 0`) y pausa el temporizador al pasar el mouse. */
export function Toast({ toast }: ToastProps) {
  const dismiss = useToastStore((state) => state.dismiss)
  const { Icon, chip, bar } = VARIANTS[toast.variant]
  const [paused, setPaused] = useState(false)
  const [closing, setClosing] = useState(false)

  const close = useCallback(() => {
    setClosing(true)
    window.setTimeout(() => dismiss(toast.id), 160)
  }, [dismiss, toast.id])

  useEffect(() => {
    if (paused || closing || toast.duration <= 0) return

    const timer = window.setTimeout(close, toast.duration)
    return () => window.clearTimeout(timer)
  }, [paused, closing, toast.duration, close])

  return (
    <div
      role={toast.variant === 'error' || toast.variant === 'warning' ? 'alert' : 'status'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        'pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border border-line bg-surface p-3.5 pl-4 shadow-lg',
        closing ? 'animate-toast-out' : 'animate-toast-in',
        'motion-reduce:animate-none',
      )}
    >
      <span aria-hidden className={cn('absolute left-0 top-0 h-full w-1', bar)} />

      <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full', chip)}>
        <Icon className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1 pt-0.5">
        {toast.title && <p className="text-sm font-semibold text-ink">{toast.title}</p>}
        <p className={cn('text-sm text-pretty text-muted', toast.title && 'mt-0.5')}>{toast.message}</p>
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Cerrar aviso"
        className="-mr-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
