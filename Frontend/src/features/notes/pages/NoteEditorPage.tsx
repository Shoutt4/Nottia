import { useParams } from 'react-router-dom'

import { LoaderIcon } from '@/components/ui/icons'

import { NoteEditor } from '../components/NoteEditor'
import { NoteNotFound } from '../components/NoteNotFound'
import { useNote } from '../hooks/useNotes'

/** Ruta `/notas/:noteId`: carga la nota y monta el editor. */
export function NoteEditorPage() {
  const { noteId } = useParams<{ noteId: string }>()
  const { data: note, isPending } = useNote(noteId)

  if (isPending) {
    return (
      <div className="note-desk grid h-full place-items-center text-paper-ink">
        <LoaderIcon
          className="h-5 w-5 animate-spin text-paper-muted"
          aria-label="Cargando nota"
        />
      </div>
    )
  }

  if (!note) return <NoteNotFound />

  // `key` reinicia el estado local (título/cuerpo) al cambiar de nota.
  return <NoteEditor key={note.id} note={note} />
}
