/**
 * Variables de entorno del frontend.
 *
 * Vite solo expone las claves con prefijo `VITE_` (ver `src/vite-env.d.ts`).
 * `VITE_API_URL` apunta al backend de Spring; se define en `.env` y puede
 * sobreescribirse en `.env.local`.
 */
const rawApiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/'

/** URL base del backend, normalizada sin barra final. */
export const API_URL = rawApiUrl.replace(/\/+$/, '')
