import { isAxiosError } from 'axios'

/** Cuerpo de error que devuelve el backend (`GlobalExceptionHandler`). */
interface ApiErrorBody {
  message?: string
  status?: number
  /** Errores de validación: `{ campo: mensaje }`. */
  error?: Record<string, string> | string
}

export type AppErrorKind = 'network' | 'auth' | 'validation' | 'client' | 'server' | 'unknown'

/** Forma estándar de cualquier error, lista para mostrar al usuario. */
export interface AppError {
  kind: AppErrorKind
  /** Mensaje en español, apto para UI. */
  message: string
  /** Código HTTP, si lo hubo. */
  status?: number
  /** Errores por campo (solo en `validation`). */
  fields: Record<string, string>
}

const FALLBACK = 'Algo salió mal. Inténtalo de nuevo.'

function messageForStatus(status: number, backendMessage?: string): string {
  if (backendMessage) return backendMessage
  if (status === 400) return 'Revisa los datos enviados.'
  if (status === 401 || status === 403) return 'No tienes permiso para hacer esto.'
  if (status === 404) return 'No encontramos lo que buscabas.'
  if (status === 409) return 'Ese dato ya existe.'
  if (status === 429) return 'Demasiados intentos. Espera un momento.'
  return FALLBACK
}

function normalizeFields(fields: ApiErrorBody['error']): Record<string, string> {
  if (!fields || typeof fields === 'string') return {}
  return fields
}

/**
 * Convierte cualquier error (Axios, red o excepción) en un `AppError` estándar.
 * Úsalo siempre antes de mostrar un error al usuario.
 */
export function getAppError(error: unknown): AppError {
  if (isAxiosError(error)) {
    if (!error.response) {
      return {
        kind: 'network',
        message: 'No pudimos conectar con el servidor. Revisa tu conexión.',
        fields: {},
      }
    }

    const { status, data } = error.response
    const body = (data ?? {}) as ApiErrorBody
    const fields = normalizeFields(body.error)

    // Nunca exponemos mensajes internos del servidor (5xx).
    if (status >= 500) {
      return {
        kind: 'server',
        status,
        message: 'El servidor tuvo un problema. Inténtalo de nuevo en un momento.',
        fields,
      }
    }

    if (status === 401 || status === 403) {
      return { kind: 'auth', status, message: messageForStatus(status, body.message), fields }
    }

    if (Object.keys(fields).length > 0) {
      return { kind: 'validation', status, message: body.message ?? 'Revisa los datos enviados.', fields }
    }

    return { kind: 'client', status, message: messageForStatus(status, body.message), fields }
  }

  if (error instanceof Error && error.message) {
    return { kind: 'unknown', message: error.message, fields: {} }
  }

  return { kind: 'unknown', message: FALLBACK, fields: {} }
}

/** Atajo: solo el mensaje estándar. */
export function getErrorMessage(error: unknown): string {
  return getAppError(error).message
}
