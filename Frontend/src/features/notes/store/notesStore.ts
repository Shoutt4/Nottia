import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { mockNotes } from '../lib/mockNotes'
import type { Note } from '../types'

export type NotePatch = Partial<Pick<Note, 'title' | 'content' | 'notebook'>>

interface NotesState {
  notes: Note[]
  /** Crea una nota vacía y devuelve su id (para navegar al editor). */
  createNote: () => string
  updateNote: (id: string, patch: NotePatch) => void
}

/**
 * Notas en memoria, persistidas en `nottia-notes`.
 * Temporal: cuando exista el endpoint, se sustituye por TanStack Query.
 */
export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: mockNotes,
      createNote: () => {
        const id = crypto.randomUUID()
        const note: Note = {
          id,
          notebook: 'Notas diarias',
          title: '',
          content: '',
          updatedAt: new Date().toISOString(),
        }

        set((state) => ({ notes: [note, ...state.notes] }))
        return id
      },
      updateNote: (id, patch) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...patch, updatedAt: new Date().toISOString() } : note,
          ),
        })),
    }),
    { name: 'nottia-notes' },
  ),
)
