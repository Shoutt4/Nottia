import { createPortal } from 'react-dom'

import { useToastStore } from '@/stores/toastStore'

import { Toast } from './Toast'

/**
 * Contenedor global de avisos. Se monta una sola vez en `AppProviders`;
 * dispara avisos con `toast` desde `@/lib/toast`.
 */
export function Toaster() {
  const toasts = useToastStore((state) => state.toasts)

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-4 top-4 z-[100] flex flex-col gap-3 sm:inset-x-auto sm:top-5 sm:right-5 sm:w-[22rem]"
    >
      {toasts.map((item) => (
        <Toast key={item.id} toast={item} />
      ))}
    </div>,
    document.body,
  )
}
