import { notePath } from '@/config/routes'

/** URL absoluta de una nota, lista para compartir o copiar. */
export function noteShareUrl(id: string): string {
  return `${window.location.origin}${notePath(id)}`
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
