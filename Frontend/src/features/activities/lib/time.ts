const pad = (value: number) => String(value).padStart(2, '0')

/** Minutos desde medianoche; acepta `HH:mm` y `HH:mm:ss.SSSSSS`. */
export function timeToMinutes(value: string): number {
  const [hours = '0', minutes = '0'] = value.split(':')
  const h = Number(hours)
  const m = Number(minutes)

  if (!Number.isFinite(h) || !Number.isFinite(m)) return 0
  return Math.max(0, Math.min(24 * 60, h * 60 + m))
}

/** `10:54:12.482910` → `10:54`. */
export function formatTime(value: string): string {
  const total = timeToMinutes(value)
  return `${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`
}

export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} – ${formatTime(end)}`
}

/** `10:54:12` → `10:54`, valor de un `<input type="time">`. */
export function toInputTime(value: string): string {
  return formatTime(value)
}

/** `10:54` → `10:54:00`, formato que acepta `LocalTime`. */
export function toApiTime(value: string): string {
  const total = timeToMinutes(value)
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}:00`
}

/** `14` → `14:00`; `24` → `24:00`. */
export function formatHour(hour: number): string {
  return `${pad(hour)}:00`
}

export function todayLabel(): string {
  return new Intl.DateTimeFormat('es', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
}
