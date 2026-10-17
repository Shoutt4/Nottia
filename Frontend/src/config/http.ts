import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { toast } from '@/lib/toast'

import { API_URL } from './env'
import { clearToken, getToken } from './token'

/**
 * Instancia de Axios compartida por toda la app.
 *
 * Úsala así:
 *   import { http } from '@/config'
 *   const { data } = await http.get('/api/auth/...')
 *
 * No crees instancias de axios por tu cuenta: aquí se centralizan la URL base,
 * el timeout, el envío del token Bearer y el manejo de sesiones expiradas.
 */
export const http = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
})

// Adjunta el token (si existe) a cada petición saliente.
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Si el backend responde 401 el token ya no es válido: se descarta y se avisa.
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const isAuthRequest = error.config?.url?.includes('/api/auth/') ?? false

      clearToken()
      window.dispatchEvent(new Event('nottia:unauthorized'))

      // En login/registro el 401 lo explica el propio formulario, no un aviso global.
      if (!isAuthRequest) {
        toast.error('Tu sesión expiró. Inicia sesión de nuevo.', { title: 'Sesión cerrada' })
      }
    }
    return Promise.reject(error)
  },
)
