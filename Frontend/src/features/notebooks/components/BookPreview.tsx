import type { CoverDesign } from '@/stores/notebookCoverStore'

import { resolveCoverStyle } from '../lib/covers'
import { NotebookCover } from './NotebookCover'

interface BookPreviewProps {
  title: string
  order: number
  author?: string
  design: CoverDesign
}

/** Libro en 3D con lomo y canto de páginas para la vista previa. */
export function BookPreview({ title, order, author, design }: BookPreviewProps) {
  const style = resolveCoverStyle(design)

  return (
    <div className="relative" style={{ perspective: '1800px' }}>
      <div
        className="relative transition-transform duration-500 ease-out"
        style={{ transform: 'rotateY(-18deg) rotateX(3deg)', transformStyle: 'preserve-3d' }}
      >
        {/* Canto de las páginas */}
        <div className="absolute inset-y-2 -right-2.5 w-5 rounded-r-md bg-[#e7dfce] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.14)]" />

        {/* Lomo */}
        <div
          className="absolute inset-y-0 -left-3 w-6 rounded-l-md shadow-[inset_2px_0_6px_rgba(0,0,0,0.28)]"
          style={{ backgroundColor: style.spine }}
        />

        {/* Tapa */}
        <div className="relative aspect-[3/4] w-[clamp(240px,30vw,380px)] overflow-hidden rounded-l-sm rounded-r-lg shadow-[0_40px_80px_-30px_rgba(20,16,32,0.55)]">
          <NotebookCover title={title} order={order} author={author} design={design} />

          {/* Brillo y curvatura del lomo */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/14 via-transparent to-white/10" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
      </div>

      {/* Sombra en el piso */}
      <div className="absolute -bottom-8 left-1/2 h-10 w-[76%] -translate-x-1/2 rounded-full bg-[#1a1426]/30 blur-2xl" />
    </div>
  )
}
