import { ROUTES } from '@/config/routes'

const SHARE_KEY = 'nottia-week'
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToBytes(value: string): Uint8Array {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  const binary = atob(padded)

  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

function xorBytes(bytes: Uint8Array): Uint8Array {
  const output = new Uint8Array(bytes.length)

  for (let index = 0; index < bytes.length; index += 1) {
    output[index] = bytes[index] ^ SHARE_KEY.charCodeAt(index % SHARE_KEY.length)
  }

  return output
}

/** Ofusca el id para el enlace público; no es cifrado criptográfico. */
function encodeShareUserId(userId: string): string {
  return bytesToBase64Url(xorBytes(new TextEncoder().encode(userId)))
}

/**
 * Decodifica el id que viaja en el enlace público. El endpoint recibe después
 * el UUID limpio, no el valor ofuscado.
 */
export function decodeShareUserId(value: string): string | null {
  try {
    const userId = new TextDecoder().decode(xorBytes(base64UrlToBytes(value)))
    return UUID_PATTERN.test(userId) ? userId : null
  } catch {
    return null
  }
}

/** URL pública: `?usuario=<id ofuscado>`; la vista lo decodifica antes de llamar a la API. */
export function scheduleShareUrl(userId: string, print = false): string {
  const usuario = encodeShareUserId(userId)
  return `${window.location.origin}${ROUTES.activitiesShare}?usuario=${usuario}${print ? '&print=1' : ''}`
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
