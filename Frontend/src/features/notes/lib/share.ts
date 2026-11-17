import { ROUTES } from '@/config/routes'

const SHARE_KEY = 'nottia-note'
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
function encodeShareNoteId(id: string): string {
  return bytesToBase64Url(xorBytes(new TextEncoder().encode(id)))
}

/** Decodifica el id que viaja en el enlace público. */
export function decodeShareNoteId(value: string): string | null {
  try {
    const id = new TextDecoder().decode(xorBytes(base64UrlToBytes(value)))
    return UUID_PATTERN.test(id) ? id : null
  } catch {
    return null
  }
}

/** URL pública de una nota (`?nota=<id ofuscado>`). */
export function noteShareUrl(id: string): string {
  return `${window.location.origin}${ROUTES.noteShare}?nota=${encodeShareNoteId(id)}`
}

/** Copia texto con la Clipboard API y recurre a `execCommand` si no está disponible. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Sin permisos de portapapeles: se intenta el método clásico.
  }

  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.top = '0'
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
