/**
 * Restos de versiones anteriores que ya no se usan.
 *
 * `nottia-notes` guardaba las notas en el navegador (store de Zustand con datos
 * de prueba). Desde que las notas vienen de la API, ese dato solo ocupa espacio
 * y puede confundir: se borra al arrancar.
 *
 * `nottia-ui` (tema/sidebar) y `nottia-cover` (portada) siguen en uso: no tocar.
 */
const LEGACY_KEYS = ['nottia-notes'] as const

export function removeLegacyStorage(): void {
  try {
    for (const key of LEGACY_KEYS) {
      localStorage.removeItem(key)
    }
  } catch {
    // localStorage puede no estar disponible (modo privado, permisos del navegador…).
  }
}
