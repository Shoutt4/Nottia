import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { InfiniteData } from '@tanstack/react-query'

import { createNoteRequest, updateNoteRequest } from '../api/notesApi'
import type { CreateNotePayload, Note, NotePage, UpdateNotePayload } from '../types'
import { notesKeys } from './useNotes'

/** Aplica un cambio de una nota a todas las páginas del carrusel. */
function patchInfinite(
  data: InfiniteData<NotePage> | undefined,
  id: string,
  patch: Partial<Note>,
) {
  if (!data) return data

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      notes: page.notes.map((note) => (note.id === id ? { ...note, ...patch } : note)),
    })),
  }
}

/** Crea una nota (`POST /api/notas/save`). */
export function useCreateNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateNotePayload) => createNoteRequest(payload),
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: notesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: notesKeys.infinites() })
      queryClient.invalidateQueries({ queryKey: notesKeys.notebookPages() })
      queryClient.setQueryData(notesKeys.detail(note.id), note)
    },
  })
}

/** Guardado manual (`PUT /api/notas/update/{id}`) con actualización de la caché. */
export function useUpdateNote(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateNotePayload) => updateNoteRequest(id, payload),
    onSuccess: (saved, payload) => {
      const patch: Partial<Note> = {
        title: payload.titulo,
        content: payload.contenido,
        locked: payload.bloqueado,
        pinned: payload.fijado,
        updatedAt: saved.updatedAt || new Date().toISOString(),
      }

      queryClient.setQueryData<Note>(notesKeys.detail(id), (current) =>
        current ? { ...current, ...patch } : current,
      )

      queryClient.setQueriesData<NotePage>({ queryKey: notesKeys.lists() }, (page) =>
        page
          ? {
              ...page,
              notes: page.notes.map((note) => (note.id === id ? { ...note, ...patch } : note)),
            }
          : page,
      )

      queryClient.setQueriesData<NotePage>({ queryKey: notesKeys.notebookPages() }, (page) =>
        page
          ? {
              ...page,
              notes: page.notes.map((note) => (note.id === id ? { ...note, ...patch } : note)),
            }
          : page,
      )

      queryClient.setQueriesData<InfiniteData<NotePage>>(
        { queryKey: notesKeys.infinites() },
        (data) => patchInfinite(data, id, patch),
      )
    },
  })
}
