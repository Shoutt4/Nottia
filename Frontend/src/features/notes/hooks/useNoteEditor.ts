import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'

import type { Note } from '../types'
import { useUpdateNote } from './useNoteMutations'

export type SaveState = 'saved' | 'dirty' | 'saving' | 'error'

/**
 * Estado local del editor: título, contenido, indicador de guardado y guardado
 * manual (`Guardar cambios` o Ctrl/⌘+S). No hay autoguardado.
 */
export function useNoteEditor(note: Note) {
  const updateNote = useUpdateNote(note.id)

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [saveState, setSaveState] = useState<SaveState>('saved')

  /** Cuenta los cambios locales para no marcar "guardado" si se escribió durante el envío. */
  const revision = useRef(0)

  const save = () => {
    if (saveState === 'saved' || saveState === 'saving') return

    const snapshot = revision.current
    setSaveState('saving')

    updateNote.mutate(
      {
        idCuaderno: note.idCuaderno,
        titulo: title,
        contenido: content,
        bloqueado: note.locked,
        fijado: note.pinned,
      },
      {
        onSuccess: () => {
          setSaveState(revision.current === snapshot ? 'saved' : 'dirty')
        },
        onError: (error) => {
          setSaveState('error')
          toast.error(getErrorMessage(error))
        },
      },
    )
  }

  // Ctrl+S / ⌘S guarda sin abrir el diálogo del navegador.
  const saveRef = useRef(save)
  useEffect(() => {
    saveRef.current = save
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault()
        saveRef.current()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    revision.current += 1
    setSaveState('dirty')
  }

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    revision.current += 1
    setSaveState('dirty')
  }

  return { title, content, saveState, save, handleTitle, handleContent }
}
