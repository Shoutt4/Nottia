import { useMemo, useRef, useState } from 'react'

import { useFullscreen } from '../hooks/useFullscreen'
import { useNewNote } from '../hooks/useNewNote'
import { useNoteEditor } from '../hooks/useNoteEditor'
import { useNotes } from '../hooks/useNotes'
import { groupNotesByDay } from '../lib/groupNotes'
import type { Note } from '../types'
import { NoteEditorBody } from './NoteEditorBody'
import { NoteEditorFooter } from './NoteEditorFooter'
import { NoteEditorHeader } from './NoteEditorHeader'
import { NoteEditorList } from './NoteEditorList'

/** Editor completo: lista de notas, barra superior, lienzo y pie. */
export function NoteEditor({ note }: { note: Note }) {
  const notesQuery = useNotes()
  const notes = useMemo(() => notesQuery.data?.notes ?? [], [notesQuery.data])
  const groups = useMemo(() => groupNotesByDay(notes), [notes])
  const { create: createNote, isPending: creatingNote } = useNewNote(note.idCuaderno)
  const { title, content, saveState, save, handleTitle, handleContent } = useNoteEditor(note)

  // Pantalla completa sobre el lienzo: oculta menú y lista.
  const editorRef = useRef<HTMLElement>(null)
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(editorRef)

  const [listOpen, setListOpen] = useState(true)

  return (
    <div className="flex h-full overflow-hidden bg-desk text-paper-ink">
      {listOpen && (
        <NoteEditorList
          notebook={note.notebook}
          activeId={note.id}
          groups={groups}
          total={notesQuery.data?.total ?? notes.length}
          isPending={notesQuery.isPending}
          creating={creatingNote}
          onCreate={createNote}
        />
      )}

      <section ref={editorRef} className="flex min-w-0 flex-1 flex-col bg-desk">
        <NoteEditorHeader
          note={note}
          title={title}
          content={content}
          listOpen={listOpen}
          isFullscreen={isFullscreen}
          onToggleList={() => setListOpen((open) => !open)}
          onToggleFullscreen={toggleFullscreen}
        />

        <NoteEditorBody
          title={title}
          content={content}
          notebook={note.notebook}
          updatedAt={note.updatedAt}
          onTitleChange={handleTitle}
          onContentChange={handleContent}
        />

        <NoteEditorFooter saveState={saveState} onSave={save} />
      </section>
    </div>
  )
}
