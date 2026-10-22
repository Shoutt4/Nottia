import type { Note } from '../types'
import { formatDayLabel } from './format'

export interface NoteGroup {
  label: string
  notes: Note[]
}

/** Agrupa por día ("Hoy", "Ayer", "12 oct"…) conservando el orden de la API. */
export function groupNotesByDay(notes: Note[]): NoteGroup[] {
  const groups = new Map<string, Note[]>()

  for (const note of notes) {
    const label = formatDayLabel(note.updatedAt)
    const group = groups.get(label)

    if (group) group.push(note)
    else groups.set(label, [note])
  }

  return Array.from(groups, ([label, items]) => ({ label, notes: items }))
}
