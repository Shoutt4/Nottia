/**
 * Color estable para cada evento: el backend no guarda color, así que se
 * deriva del id. Mismo evento = misma nota de color en cada visita.
 */
const TONE_COUNT = 4

export function eventTone(seed: string): number {
  let hash = 0

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 9973
  }

  return hash % TONE_COUNT
}
