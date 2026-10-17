/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Dominio del backend de Spring (baseURL de axios). Define `VITE_API_URL` en `.env`. */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
