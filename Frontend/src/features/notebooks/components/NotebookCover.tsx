import { useId } from 'react'

import { cn } from '@/lib/utils'
import type { CoverDesign, CoverTemplate } from '@/stores/notebookCoverStore'

import { contrastInk, formatOrder, resolveCoverStyle } from '../lib/covers'

interface NotebookCoverProps {
  title: string
  order: number
  author?: string
  design: CoverDesign
  /** `preview` muestra más arte; `card` simplifica para la grilla. */
  variant?: 'preview' | 'card'
  className?: string
}

/**
 * Portada de un cuaderno. Se adapta a cualquier tamaño con container queries
 * (`cqw`), así sirve igual en la grilla y en la vista previa del diseñador.
 */
export function NotebookCover({
  title,
  order,
  author,
  design,
  variant = 'preview',
  className,
}: NotebookCoverProps) {
  const style = resolveCoverStyle(design)
  const label = title.trim() || 'Sin título'
  const name = author?.trim() || 'Tu nombre'
  const initial = name.charAt(0).toUpperCase()
  const compact = variant === 'card'

  return (
    <div
      className={cn('relative flex h-full w-full flex-col justify-between overflow-hidden', className)}
      style={{
        background: style.background,
        color: style.ink,
        containerType: 'inline-size',
        textShadow: style.textShadow,
      }}
    >
      <CoverArt template={design.template} color={style.color} accent={style.accent} hidden={style.hasImage} />

      <header className="relative z-10 flex items-center justify-between gap-3 px-[8%] pt-[8%]">
        <span
          className="font-mono uppercase tracking-[0.22em]"
          style={{ fontSize: 'clamp(6px, 3.1cqw, 10px)', color: style.softInk }}
        >
          Cuaderno
        </span>
        <span
          className="font-mono uppercase tracking-[0.22em]"
          style={{ fontSize: 'clamp(6px, 3.1cqw, 10px)', color: style.softInk }}
        >
          N.º {formatOrder(order)}
        </span>
      </header>

      <div className="relative z-10 px-[8%]">
        <div
          className={cn('mb-[5%] h-px', compact ? 'w-8' : 'w-12')}
          style={{ backgroundColor: style.accent }}
        />
        <h3
          className={cn(
            'font-serif font-semibold leading-[0.95] tracking-[-0.02em] [overflow-wrap:anywhere]',
            compact ? 'line-clamp-3' : 'line-clamp-4',
          )}
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: compact
              ? 'clamp(0.9rem, 11cqw, 1.45rem)'
              : 'clamp(1.55rem, 9.4cqw, 3.2rem)',
          }}
        >
          {label}
        </h3>
      </div>

      <footer className="relative z-10 flex items-end justify-between gap-3 px-[8%] pb-[8%]">
        <div className="min-w-0">
          <p
            className="font-mono uppercase tracking-[0.2em]"
            style={{ fontSize: 'clamp(5px, 2.6cqw, 8px)', color: style.softInk }}
          >
            Nottia
          </p>
          <p
            className="mt-1 truncate font-medium"
            style={{ fontSize: 'clamp(7px, 3.2cqw, 12px)' }}
          >
            {name}
          </p>
        </div>

        <span
          className={cn(
            'grid shrink-0 place-items-center rounded-full font-serif font-semibold',
            compact ? 'h-7 w-7 text-[10px]' : 'h-10 w-10 text-sm',
          )}
          style={{ backgroundColor: style.accent, color: contrastInk(style.accent) }}
        >
          {initial}
        </span>
      </footer>
    </div>
  )
}

interface CoverArtProps {
  template: CoverTemplate
  color: string
  accent: string
  hidden: boolean
}

/** Arte abstracto de cada plantilla: da el aire editorial sin usar imágenes. */
function CoverArt({ template, color, accent, hidden }: CoverArtProps) {
  const rawId = useId()
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '')

  if (hidden) return null

  const common = {
    className: 'pointer-events-none absolute inset-0 z-0 h-full w-full',
    viewBox: '0 0 300 400',
    preserveAspectRatio: 'xMidYMid slice',
    'aria-hidden': true,
  }

  if (template === 'nocturno') {
    return (
      <svg {...common}>
        <defs>
          <mask id={`moon-${id}`}>
            <rect width="300" height="400" fill="white" />
            <circle cx="252" cy="82" r="30" fill="black" />
          </mask>
        </defs>
        <circle cx="236" cy="92" r="46" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
        <circle cx="236" cy="92" r="31" fill={accent} opacity="0.85" mask={`url(#moon-${id})`} />
        <circle cx="60" cy="292" r="2" fill={accent} opacity="0.7" />
        <circle cx="86" cy="128" r="1.5" fill={accent} opacity="0.5" />
        <circle cx="206" cy="222" r="1.5" fill={accent} opacity="0.45" />
        <path
          d="M32 356c42-28 88 8 128-10s62-28 108-10"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    )
  }

  if (template === 'solar') {
    return (
      <svg {...common}>
        <circle cx="242" cy="300" r="96" fill={accent} opacity="0.22" />
        <circle cx="242" cy="300" r="120" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.35" />
        <circle cx="66" cy="112" r="13" fill={accent} opacity="0.9" />
        <path
          d="M-10 244c44-34 86 20 134-8s70-40 116-18"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          opacity="0.4"
        />
      </svg>
    )
  }

  if (template === 'lavanda') {
    return (
      <svg {...common}>
        <circle cx="252" cy="92" r="66" fill="none" stroke={accent} strokeWidth="1" opacity="0.3" />
        <circle cx="252" cy="92" r="42" fill={color} opacity="0.22" />
        <circle cx="64" cy="330" r="50" fill={accent} opacity="0.14" />
        <path d="M32 212h58M61 183v58" stroke={accent} strokeWidth="1" opacity="0.4" />
      </svg>
    )
  }

  if (template === 'minimal') {
    return (
      <svg {...common}>
        <rect x="0" y="0" width="14" height="400" fill={color} opacity="0.9" />
        <circle cx="250" cy="112" r="46" fill="none" stroke={accent} strokeWidth="1" opacity="0.32" />
        <circle cx="250" cy="112" r="28" fill={color} opacity="0.14" />
        <path d="M222 330h48" stroke={accent} strokeWidth="1" opacity="0.35" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <circle cx="242" cy="300" r="78" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="242" cy="300" r="58" fill={accent} opacity="0.13" />
      <path d="M34 96h36M34 106h22" stroke={accent} strokeWidth="1" opacity="0.45" />
      <circle cx="252" cy="66" r="3" fill={color} opacity="0.65" />
    </svg>
  )
}
