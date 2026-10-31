export interface LoginCredentials {
  email: string
  password: string
  remember: boolean
}

export type LoginField = 'email' | 'password'

export type LoginErrors = Partial<Record<LoginField, string>>

export type LoginStatus = 'idle' | 'submitting' | 'success'

/** Resultado de enviar el login: si falla por correo sin verificar, trae el correo. */
export type LoginResult =
  | { ok: true }
  | { ok: false; unverifiedEmail?: string }

/** Cuerpo de `POST /api/auth/register` (`AuthRequestDTO`). */
export interface RegisterPayload {
  nombre: string
  apellido: string
  email: string
  password: string
}

/** Respuesta de `POST /api/auth/register` (`Map.of("suces", true, "message", …)`). */
export interface RegisterResponse {
  suces: boolean
  message: string
}

/** Valores del formulario (la confirmación es solo del cliente). */
export interface RegisterValues extends RegisterPayload {
  confirmPassword: string
}

export type RegisterField = keyof RegisterValues

export type RegisterErrors = Partial<Record<RegisterField, string>>

export type RegisterStatus = 'idle' | 'submitting' | 'success'

/** Respuesta de `GET /api/email/verify-email?token=…`. */
export interface VerifyEmailResponse {
  suces: string
}

/** Respuesta de `POST /api/email/update?email=…` (el backend usa `succes`). */
export interface ResendVerificationResponse {
  succes: string
}

export type ResendStatus = 'idle' | 'sending' | 'sent' | 'error'
