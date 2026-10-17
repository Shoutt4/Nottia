import { create } from 'zustand'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastOptions {
  /** Título opcional; si falta, solo se muestra el mensaje. */
  title?: string
  /** Duración en ms. `0` = no se cierra sola. */
  duration?: number
}

export interface Toast {
  id: string
  variant: ToastVariant
  message: string
  title?: string
  duration: number
}

/** Duración por defecto según la importancia del aviso. */
export const TOAST_DURATION: Record<ToastVariant, number> = {
  success: 4000,
  info: 4500,
  warning: 6000,
  error: 7000,
}

/** Máximo de avisos en pantalla; al superarlo se descarta el más antiguo. */
const MAX_TOASTS = 4

interface ToastState {
  toasts: Toast[]
  push: (toast: { variant: ToastVariant; message: string } & ToastOptions) => string
  dismiss: (id: string) => void
  clear: () => void
}

let counter = 0

/** Estado global de avisos (no persistido). Dispara con `@/lib/toast`. */
export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  push: ({ variant, message, title, duration }) => {
    const id = `toast-${++counter}`
    const next: Toast = {
      id,
      variant,
      message,
      title,
      duration: duration ?? TOAST_DURATION[variant],
    }

    set((state) => ({ toasts: [...state.toasts, next].slice(-MAX_TOASTS) }))
    return id
  },

  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((item) => item.id !== id) })),

  clear: () => set({ toasts: [] }),
}))
