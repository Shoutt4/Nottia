import { useCallback, useEffect, useRef, useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

import type { Note } from '../types'
import { AddNoteCard } from './AddNoteCard'
import { NoteCard } from './NoteCard'
import { NoteCardSkeleton } from './NoteCardSkeleton'

interface NotesRailProps {
  notes: Note[]
  defaultNotebookId?: string | null
  /** Hay más páginas en el backend. */
  hasMore?: boolean
  loadingMore?: boolean
  onLoadMore?: () => void
}

/** Ancho de una tarjeta (208 px) + gap (16 px). */
const SCROLL_STEP = 224
const EDGE = 8
/** Distancia al final a la que se pide la siguiente página. */
const LOAD_AHEAD = 200

const ARROW_CLASS =
  'absolute top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-paper-line bg-paper/95 text-paper-ink shadow-lg backdrop-blur transition-colors duration-200 hover:border-paper-accent/50 hover:text-paper-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:grid'

/** Carrusel horizontal de notas con flechas y carga por páginas. */
export function NotesRail({
  notes,
  defaultNotebookId,
  hasMore,
  loadingMore,
  onLoadMore,
}: NotesRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const sync = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    setCanScrollLeft(track.scrollLeft > EDGE)
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - EDGE)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    sync()

    const observer = new ResizeObserver(sync)
    observer.observe(track)
    window.addEventListener('resize', sync)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [notes.length, loadingMore, sync])

  const handleScroll = () => {
    sync()

    const track = trackRef.current
    if (!track || !hasMore || !onLoadMore) return

    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - LOAD_AHEAD) {
      onLoadMore()
    }
  }

  const scroll = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * SCROLL_STEP * 2, behavior: 'smooth' })
  }

  return (
    <div className="group relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}

        {loadingMore && <NoteCardSkeleton />}

        <AddNoteCard defaultNotebookId={defaultNotebookId} />
      </div>

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Notas anteriores"
          title="Notas anteriores"
          className={cn(ARROW_CLASS, 'left-0')}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      )}

      {(canScrollRight || hasMore) && (
        <button
          type="button"
          onClick={() => {
            scroll(1)
            if (!canScrollRight && hasMore) onLoadMore?.()
          }}
          aria-label="Notas siguientes"
          title="Notas siguientes"
          className={cn(ARROW_CLASS, 'right-0')}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
