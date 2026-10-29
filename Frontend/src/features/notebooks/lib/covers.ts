import type { CoverDesign, CoverTemplate } from '@/stores/notebookCoverStore'

import { notebookColor } from './colors'

/** Metadatos de cada estilo de tapa. */
export interface CoverTemplateInfo {
  id: CoverTemplate
  label: string
  hint: string
  /** Acento que se aplica al elegir el estilo. */
  accent: string
}

export const COVER_TEMPLATES: CoverTemplateInfo[] = [
  { id: 'papel', label: 'Papel', hint: 'Editorial', accent: '#b4552d' },
  { id: 'nocturno', label: 'Nocturno', hint: 'Profundo', accent: '#f0b64a' },
  { id: 'solar', label: 'Solar', hint: 'Geométrico', accent: '#d3442e' },
  { id: 'lavanda', label: 'Lavanda', hint: 'Suave', accent: '#6b4de6' },
  { id: 'minimal', label: 'Minimal', hint: 'Limpio', accent: '#22201c' },
]

/** Acentos disponibles para el arte de la tapa. */
export const COVER_ACCENTS = [
  '#b4552d',
  '#d3442e',
  '#e0822b',
  '#e8c547',
  '#4caf82',
  '#3f9e8f',
  '#5b8def',
  '#6b4de6',
  '#c05aa0',
  '#22201c',
  '#f0b64a',
  '#f3ede1',
]

const TEMPLATE_BY_COLOR: Record<string, CoverTemplate> = {
  azul: 'nocturno',
  naranja: 'solar',
  amarillo: 'solar',
  verde: 'papel',
  rosa: 'lavanda',
  morado: 'lavanda',
  rojo: 'papel',
  gris: 'minimal',
}

export function templateInfo(template: CoverTemplate): CoverTemplateInfo {
  return COVER_TEMPLATES.find((item) => item.id === template) ?? COVER_TEMPLATES[0]
}

/** Diseño inicial derivado del color del cuaderno. */
export function defaultCover(notebook: { color: string }): CoverDesign {
  const template = TEMPLATE_BY_COLOR[notebook.color] ?? 'papel'

  return {
    template,
    color: notebookColor(notebook.color),
    accent: templateInfo(template).accent,
    image: null,
  }
}

/** Colores ya resueltos para pintar una portada. */
export interface CoverStyle {
  background: string
  ink: string
  softInk: string
  /** Color principal (el del cuaderno). */
  color: string
  /** Color secundario para líneas, sellos y arte. */
  accent: string
  /** Color del lomo. */
  spine: string
  hasImage: boolean
  textShadow?: string
}

export function resolveCoverStyle(design: CoverDesign): CoverStyle {
  if (design.image) {
    return {
      background: `linear-gradient(180deg, rgba(10, 9, 14, 0.34) 0%, rgba(10, 9, 14, 0.08) 38%, rgba(10, 9, 14, 0.76) 100%), url(${design.image}) center / cover no-repeat`,
      ink: '#fffaf0',
      softInk: 'rgba(255, 250, 240, 0.78)',
      color: design.color,
      accent: design.accent,
      spine: '#221f2a',
      hasImage: true,
      textShadow: '0 1px 22px rgba(0, 0, 0, 0.45)',
    }
  }

  const color = design.color

  switch (design.template) {
    case 'nocturno':
      return {
        background: `radial-gradient(120% 85% at 88% 0%, ${withAlpha(color, 0.42)} 0%, transparent 58%), linear-gradient(160deg, #1a1e35 0%, #0b0d1a 100%)`,
        ink: '#f6f2e8',
        softInk: '#a8adca',
        color,
        accent: design.accent,
        spine: '#080a13',
        hasImage: false,
      }
    case 'solar':
      return {
        background: `linear-gradient(155deg, ${color} 0%, ${shade(color, -0.22)} 100%)`,
        ink: isDark(color) ? '#fbf6ea' : '#241d10',
        softInk: isDark(color) ? '#e2dac2' : '#6d5a25',
        color,
        accent: design.accent,
        spine: shade(color, -0.34),
        hasImage: false,
      }
    case 'lavanda':
      return {
        background: `radial-gradient(95% 70% at 100% 0%, ${withAlpha(color, 0.52)} 0%, transparent 62%), linear-gradient(150deg, #f4eeff 0%, #ddcbfa 100%)`,
        ink: '#291e4d',
        softInk: '#766a9a',
        color,
        accent: design.accent,
        spine: '#c7b5f2',
        hasImage: false,
      }
    case 'minimal':
      return {
        background: 'linear-gradient(180deg, #fbf9f4 0%, #f0ece2 100%)',
        ink: '#201e1a',
        softInk: '#8b8476',
        color,
        accent: design.accent,
        spine: shade(color, -0.12),
        hasImage: false,
      }
    case 'papel':
    default:
      return {
        background: 'linear-gradient(155deg, #f8f3e8 0%, #ebe1cf 100%)',
        ink: '#211f1b',
        softInk: '#7e7462',
        color,
        accent: design.accent,
        spine: '#d4c7b2',
        hasImage: false,
      }
  }
}

/** Color de texto legible sobre un fondo dado. */
export function contrastInk(hex: string): string {
  return isDark(hex) ? '#fdf9ef' : '#201e1a'
}

/** `02`, `07`, … para la etiqueta «N.º» de la tapa. */
export function formatOrder(order: number): string {
  const value = Number.isFinite(order) ? Math.max(0, Math.trunc(order)) : 0
  return String(value).padStart(2, '0')
}

function toRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((char) => char + char)
          .join('')
      : clean

  return {
    r: Number.parseInt(full.slice(0, 2), 16) || 0,
    g: Number.parseInt(full.slice(2, 4), 16) || 0,
    b: Number.parseInt(full.slice(4, 6), 16) || 0,
  }
}

function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = toRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/** Oscurece (`amount` negativo) o aclara un color. */
function shade(hex: string, amount: number): string {
  const { r, g, b } = toRgb(hex)
  const target = amount < 0 ? 0 : 255
  const ratio = Math.min(1, Math.abs(amount))
  const mix = (channel: number) => Math.round(channel + (target - channel) * ratio)
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

function isDark(hex: string): boolean {
  const { r, g, b } = toRgb(hex)
  const luminance =
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
  return luminance < 0.18
}

/** Luminancia relativa sRGB (WCAG) de un canal 0–255. */
function channel(value: number): number {
  const c = value / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}
