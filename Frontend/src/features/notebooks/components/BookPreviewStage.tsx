import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

import { cn } from '@/lib/utils'
import type { CoverDesign } from '@/stores/notebookCoverStore'

import { BookPreview } from './BookPreview'

const MIN_ZOOM = 0.5
const MAX_ZOOM = 2.5
const ROTATE_SPEED = 0.35
const MAX_TILT = 70

interface BookPreviewStageProps {
  title: string
  order: number
  author?: string
  design: CoverDesign
}

interface DragState {
  pointerId: number
  startX: number
  startY: number
  rotateX: number
  rotateY: number
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/**
 * Vista previa interactiva del diseñador. Con el mouse: arrastrar gira la
 * portada y la rueda hace zoom. El estado vive solo en este componente, así
 * que no se guarda en el cuaderno ni en el store y se reinicia al salir.
 */
export function BookPreviewStage({ title, order, author, design }: BookPreviewStageProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)

  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleWheel = (event: WheelEvent) => {
      // Ctrl + rueda es el zoom del navegador: no lo interceptamos.
      if (event.ctrlKey) return
      event.preventDefault()
      const factor = event.deltaY < 0 ? 1.08 : 0.92
      setZoom((current) => clamp(current * factor, MIN_ZOOM, MAX_ZOOM))
    }

    canvas.addEventListener('wheel', handleWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', handleWheel)
  }, [])

  const reset = () => {
    setZoom(1)
    setRotation({ x: 0, y: 0 })
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current || event.button !== 0) return

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      rotateX: rotation.x,
      rotateY: rotation.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const dx = event.clientX - drag.startX
    const dy = event.clientY - drag.startY

    setRotation({
      x: clamp(drag.rotateX - dy * ROTATE_SPEED, -MAX_TILT, MAX_TILT),
      y: drag.rotateY + dx * ROTATE_SPEED,
    })
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    dragRef.current = null
    setDragging(false)
  }

  return (
    <div className="relative flex w-full animate-rise flex-col items-center justify-center gap-8">
      <div
        ref={canvasRef}
        role="group"
        aria-label="Vista previa interactiva de la portada"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={() => {
          dragRef.current = null
          setDragging(false)
        }}
        onDoubleClick={reset}
        className={cn(
          'relative select-none touch-none',
          dragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        <div
          className="relative"
          style={{
            transform: `scale(${zoom})`,
            transition: 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'transform',
          }}
        >
          <BookPreview
            title={title}
            order={order}
            author={author}
            design={design}
            rotateX={rotation.x}
            rotateY={rotation.y}
            dragging={dragging}
          />
        </div>
      </div>

      <p className="relative z-20 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-[#a59b8b]">
        3:4 · portada · arrastra para girar
        <span className="hidden sm:inline"> · rueda para zoom · doble clic para restablecer</span>
      </p>
    </div>
  )
}
