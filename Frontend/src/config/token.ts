/**
 * Almacenamiento del JWT que devuelve el backend en `POST /api/auth/login`
 * (`{ token }`).
 *
 * - Con "Recordarme" el token va a `localStorage` (sobrevive a cerrar el navegador).
 * - Sin "Recordarme" va a `sessionStorage` (se borra al cerrar la pestaña).
 *
 * Seguridad: se envía siempre en la cabecera `Authorization: Bearer <token>`
 * (ver `http.ts`), nunca en la URL, y no se registra en consola. Al ser una API
 * que devuelve el token en el body (no cookies httpOnly), el navegador debe
 * almacenarlo; el riesgo residual es XSS, por eso conviene no inyectar HTML.
 */
const TOKEN_KEY = 'nottia-token'

interface JwtPayload {
  exp?: number
  sub?: string
  [claim: string]: unknown
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string, persist = true): void {
  if (persist) {
    localStorage.setItem(TOKEN_KEY, token)
    sessionStorage.removeItem(TOKEN_KEY)
  } else {
    sessionStorage.setItem(TOKEN_KEY, token)
    localStorage.removeItem(TOKEN_KEY)
  }
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}

/** Decodifica el payload del JWT sin verificarlo (la firma la valida el backend). */
export function getTokenPayload(token = getToken()): JwtPayload | null {
  if (!token) return null
  try {
    const [, payload] = token.split('.')
    if (!payload) return null

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const bytes = Uint8Array.from(atob(normalized), (char) => char.charCodeAt(0))
    return JSON.parse(new TextDecoder().decode(bytes)) as JwtPayload
  } catch {
    return null
  }
}

/**
 * `true` si hay token y no ha caducado (según el claim `exp`).
 * Si el token no trae `exp`, se considera válido y deja que el backend decida.
 */
export function isAuthenticated(): boolean {
  const token = getToken()
  if (!token) return false

  const payload = getTokenPayload(token)
  if (!payload?.exp) return true

  return payload.exp * 1000 > Date.now()
}

export interface CurrentUser {
  email: string | null
  nombre: string | null
  role: string | null
}

/** Datos del usuario a partir de los claims del JWT (no verificados). */
export function getCurrentUser(): CurrentUser {
  const payload = getTokenPayload()
  const asString = (value: unknown) => (typeof value === 'string' ? value : null)

  return {
    email: asString(payload?.sub),
    nombre: asString(payload?.nombre),
    role: asString(payload?.role),
  }
}
