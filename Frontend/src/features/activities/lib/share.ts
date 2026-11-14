import { ROUTES } from '@/config/routes'

import type { Activity, ApiDay } from '../types'
import { isApiDay } from './days'

export interface ShareActivity {
  name: string
  description: string
  color: string
  day: ApiDay
  start: string
  end: string
}

export interface SharePayload {
  title: string
  activities: ShareActivity[]
}

const STORAGE_KEY = 'nottia-actividades-share'

export function toSharePayload(activities: Activity[], title = 'Mi semana'): SharePayload {
  return {
    title,
    activities: activities.map((activity) => ({
      name: activity.name,
      description: activity.description,
      color: activity.color,
      day: activity.day,
      start: activity.start,
      end: activity.end,
    })),
  }
}

export function sharedToActivity(activity: ShareActivity, index: number): Activity {
  return {
    id: `share-${index}`,
    name: activity.name,
    description: activity.description,
    color: activity.color,
    day: activity.day,
    start: activity.start,
    end: activity.end,
  }
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToText(value: string): string {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return new TextDecoder().decode(bytes)
}

export function encodeSharePayload(payload: SharePayload): string {
  return bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)))
}

function parsePayload(json: string): SharePayload | null {
  try {
    const parsed = JSON.parse(json) as SharePayload
    if (!parsed || typeof parsed.title !== 'string' || !Array.isArray(parsed.activities)) {
      return null
    }

    const activities = parsed.activities.filter(
      (item) =>
        item &&
        typeof item.name === 'string' &&
        typeof item.description === 'string' &&
        typeof item.color === 'string' &&
        typeof item.start === 'string' &&
        typeof item.end === 'string' &&
        isApiDay(item.day),
    )

    if (activities.length !== parsed.activities.length) return null
    return { title: parsed.title, activities }
  } catch {
    return null
  }
}

export function decodeSharePayload(value: string): SharePayload | null {
  try {
    return parsePayload(base64UrlToText(value))
  } catch {
    return null
  }
}

export function saveSharePayload(payload: SharePayload): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Sin almacenamiento disponible: la URL sigue llevando los datos.
  }
}

function readStoredSharePayload(): SharePayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? parsePayload(raw) : null
  } catch {
    return null
  }
}

/** La URL manda; si no trae datos, usa el último guardado en este navegador. */
export function readSharePayload(value: string | null): SharePayload | null {
  return value === null ? readStoredSharePayload() : decodeSharePayload(value)
}

export function scheduleShareUrl(payload: SharePayload, print = false): string {
  const data = encodeSharePayload(payload)
  const query = `data=${data}${print ? '&print=1' : ''}`
  return `${window.location.origin}${ROUTES.activitiesShare}?${query}`
}

/** Copia un texto con la Clipboard API y recurre a `execCommand`. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Sin permisos: se intenta el método clásico.
  }

  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(area)
    return copied
  } catch {
    return false
  }
}
