import { useToastStore } from '@/stores/toastStore'
import type { ToastOptions, ToastVariant } from '@/stores/toastStore'

function push(variant: ToastVariant, message: string, options: ToastOptions = {}) {
  return useToastStore.getState().push({ variant, message, ...options })
}

/**
 * API para disparar avisos desde cualquier sitio (componentes o no).
 *
 *   import { toast } from '@/lib/toast'
 *   toast.error('No pudimos guardar los cambios.')
 *   toast.success('Cambios guardados.', { title: 'Listo' })
 */
export const toast = {
  success: (message: string, options?: ToastOptions) => push('success', message, options),
  error: (message: string, options?: ToastOptions) => push('error', message, options),
  warning: (message: string, options?: ToastOptions) => push('warning', message, options),
  info: (message: string, options?: ToastOptions) => push('info', message, options),
  dismiss: (id: string) => useToastStore.getState().dismiss(id),
  clear: () => useToastStore.getState().clear(),
}
