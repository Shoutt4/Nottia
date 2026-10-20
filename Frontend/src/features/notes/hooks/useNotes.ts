import { useNotesStore } from '../store/notesStore'
import type { Note } from '../types'

/**
 * Notas del inicio. Hoy lee del store local; cuando exista el endpoint,
 * aquí entra un `useQuery` de TanStack Query.
 */
export function useNotes(): { notes: Note[]; isPending: boolean } {
  const notes = useNotesStore((state) => state.notes)
  return { notes, isPending: false }
}
