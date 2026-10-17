export interface LoginCredentials {
  email: string
  password: string
  remember: boolean
}

export type LoginField = 'email' | 'password'

export type LoginErrors = Partial<Record<LoginField, string>>

export type LoginStatus = 'idle' | 'submitting' | 'success'
