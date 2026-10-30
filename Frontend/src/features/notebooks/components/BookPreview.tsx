import type { CSSProperties } from 'react'

import { cn } from '@/lib/utils'
import type { CoverDesign } from '@/stores/notebookCoverStore'

import { resolveCoverStyle } from '../lib/covers'
import { NotebookCover } from './NotebookCover'

interface BookPreviewProps {
  title: string
  order: number
  author?: string
  design: CoverDesign
  /** Inclinación vertical adicional (eje X), en grados. Solo para la previa. */
  rotateX?: number
  /** Giro horizontal adicional (eje Y), en grados. Solo para la previa. */
  rotateY?: number
  /** Desactiva la transición mientras se arrastra. */
  dragging?: boolean
}

type BookVars = CSSProperties & {
  '--book-w': string
  '--book-d': string
}

const BOOK_VARS: BookVars = {
  '--book-w': 'clamp(240px, 30vw, 380px)',
  '--book-d': 'clamp(20px, 3vw, 38px)',
  width: 'var(--book-w)',
  aspectRatio: '3 / 4',
  transformStyle: 'preserve-3d',
}

const PAGE_EDGE_X =
  'repeating-linear-gradient(to right, #f1eadc 0 1px, #ddd2bd 1px 2px)'
const PAGE_EDGE_Y =
  'repeating-linear-gradient(to bottom, #f1eadc 0 1px, #ddd2bd 1px 2px)'

/** Libro en 3D con lomo, canto de páginas y contraportada. */
export function BookPreview({
  title,
  order,
  author,
  design,
  rotateX = 0,
  rotateY = 0,
  dragging = false,
}: BookPreviewProps) {
  const style = resolveCoverStyle(design)
  const backBackground = style.hasImage ? style.spine : style.background

  return (
    <div className="relative" style={{ perspective: '1800px' }}>
      <div
        className={cn('relative', !dragging && 'transition-transform duration-500 ease-out')}
        style={{
          transform: `rotateY(${-18 + rotateY}deg) rotateX(${3 + rotateX}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative" style={BOOK_VARS}>
          {/* Contraportada */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              transform: 'translateZ(calc(var(--book-d) * -0.5)) rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-l-sm rounded-r-lg ring-1 ring-black/10"
              style={{ background: backBackground }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/15" />
              <div className="absolute inset-0 flex flex-col justify-end p-[8%]">
                <span className="mb-1 h-px w-8" style={{ backgroundColor: style.accent }} />
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.22em]"
                  style={{ color: style.softInk }}
                >
                  Nottia
                </span>
              </div>
            </div>
          </div>

          {/* Canto de las páginas: derecha, superior e inferior */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="absolute right-0 top-0 h-full w-[var(--book-d)]"
              style={{
                transform: 'translateX(calc(var(--book-d) * 0.5)) rotateY(90deg)',
                backfaceVisibility: 'hidden',
                background: PAGE_EDGE_X,
                boxShadow: 'inset 0 0 12px rgba(80, 60, 40, 0.18)',
              }}
            />
            <div
              className="absolute left-0 top-0 h-[var(--book-d)] w-full"
              style={{
                transform: 'translateY(calc(var(--book-d) * -0.5)) rotateX(90deg)',
                backfaceVisibility: 'hidden',
                background: PAGE_EDGE_Y,
                boxShadow: 'inset 0 0 12px rgba(80, 60, 40, 0.16)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 h-[var(--book-d)] w-full"
              style={{
                transform: 'translateY(calc(var(--book-d) * 0.5)) rotateX(-90deg)',
                backfaceVisibility: 'hidden',
                background: PAGE_EDGE_Y,
                boxShadow: 'inset 0 0 12px rgba(80, 60, 40, 0.16)',
              }}
            />
          </div>

          {/* Lomo */}
          <div
            aria-hidden
            className="absolute left-0 top-0 h-full w-[var(--book-d)]"
            style={{
              transform: 'translateX(calc(var(--book-d) * -0.5)) rotateY(-90deg)',
              backfaceVisibility: 'hidden',
              backgroundColor: style.spine,
              boxShadow: 'inset 0 0 14px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(0,0,0,0.38), transparent 30%, rgba(255,255,255,0.14) 58%, rgba(0,0,0,0.38))',
              }}
            />
          </div>

          {/* Tapa */}
          <div
            className="absolute inset-0"
            style={{
              transform: 'translateZ(calc(var(--book-d) * 0.5))',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-l-sm rounded-r-lg ring-1 ring-black/10">
              <NotebookCover title={title} order={order} author={author} design={design} />

              {/* Brillo y curvatura del lomo */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/14 via-transparent to-white/10" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Sombra en el piso */}
      <div className="absolute -bottom-8 left-1/2 h-10 w-[84%] -translate-x-1/2 rounded-full bg-[#1a1426]/30 blur-2xl" />
    </div>
  )
}
