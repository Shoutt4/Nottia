import type { Note } from '../types'
import { AddNoteCard } from './AddNoteCard'
import { NoteCard } from './NoteCard'

interface NotesRailProps {
  notes: Note[]
}

/** Carrusel horizontal de notas (scroll con snap, sin barra visible). */
export function NotesRail({ notes }: NotesRailProps) {
  return (
    <div className="flex snap-x gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
      <AddNoteCard />
    </div>
  )
}
