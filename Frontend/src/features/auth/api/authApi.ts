import { http } from '@/config'

import type {
  EmailActionResponse,
  LoginCredentials,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
  ResetTokenResponse,
  ResendVerificationResponse,
  VerifyEmailResponse,
} from '../types'

interface LoginResponse {
  token: string
}

/**
 * `POST /api/auth/login` con `{ email, password }`.
 * Devuelve el JWT del backend (`{ token }`).
 */
export async function login(
  credentials: Pick<LoginCredentials, 'email' | 'password'>,
): Promise<string> {
  const { data } = await http.post<LoginResponse>('/api/auth/login', {
    email: credentials.email.trim(),
    password: credentials.password,
  })

  return data.token
}

/**
 * `POST /api/auth/register` con `{ nombre, apellido, email, password }`.
 * La cuenta queda inactiva hasta verificar el correo; devuelve el mensaje del backend.
 */
export async function register(payload: RegisterPayload): Promise<string> {
  const { data } = await http.post<RegisterResponse>('/api/auth/register', payload)
  return data.message
}

/** `GET /api/email/verify-email?token=…` — activa la cuenta del token. */
export async function verifyEmail(token: string): Promise<string> {
  const { data } = await http.get<VerifyEmailResponse>('/api/email/verify-email', {
    params: { token },
  })

  return data.suces
}

/**
 * `POST /api/email/update?email=…` — genera un token nuevo y reenvía el enlace
 * de verificación. Solo funciona si la cuenta sigue sin verificar.
 */
export async function resendVerification(email: string): Promise<void> {
  await http.post<ResendVerificationResponse>('/api/email/update', null, {
    params: { email: email.trim() },
  })
}

/**
 * `POST /api/email/reset/email?email=…` — genera un token de recuperación
 * y envía al correo el enlace a `/reset-password?token=…`.
 */
export async function requestPasswordReset(email: string): Promise<EmailActionResponse> {
  const { data } = await http.post<EmailActionResponse>('/api/email/reset/email', null, {
    params: { email: email.trim() },
  })

  return data
}

/** `GET /api/email/reset/token/expiration?token=…` — comprueba que el enlace siga vigente. */
export async function validateResetToken(token: string): Promise<ResetTokenResponse> {
  const { data } = await http.get<ResetTokenResponse>('/api/email/reset/token/expiration', {
    params: { token },
  })

  return data
}

/**
 * `POST /api/email/rest/verify?token=…` con `{ email, password }`.
 * El correo debe coincidir con el dueño del token.
 */
export async function resetPassword(
  token: string,
  payload: ResetPasswordPayload,
): Promise<EmailActionResponse> {
  const { data } = await http.post<EmailActionResponse>('/api/email/rest/verify', payload, {
    params: { token },
  })

  return data
}
