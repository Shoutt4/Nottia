import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'

import { fetchNote, fetchNotes } from '../api/notesApi'
import type { NotePage } from '../types'

/** Tamaño de página de la lista lateral del editor. */
export const NOTES_PAGE_SIZE = 50
/** Notas por tanda del carrusel del inicio. */
export const NOTES_RAIL_PAGE_SIZE = 12

export const notesKeys = {
  all: ['notes'] as const,
  lists: () => [...notesKeys.all, 'list'] as const,
  list: (page: number, size: number) => [...notesKeys.lists(), page, size] as const,
  infinites: () => [...notesKeys.all, 'infinite'] as const,
  infinite: (size: number) => [...notesKeys.infinites(), size] as const,
  detail: (id: string) => [...notesKeys.all, 'detail', id] as const,
}

/** Notas paginadas del usuario (`GET /api/notas/all`). */
export function useNotes(page = 0, size = NOTES_PAGE_SIZE) {
  return useQuery({
    queryKey: notesKeys.list(page, size),
    queryFn: () => fetchNotes(page, size),
    staleTime: 30_000,
  })
}

/**
 * Carrusel del inicio: pide páginas de `size` notas según se avanza.
 * `getNextPageParam` se apoya en `total` para no depender de `totalPages`.
 */
export function useInfiniteNotes(size = NOTES_RAIL_PAGE_SIZE) {
  return useInfiniteQuery({
    queryKey: notesKeys.infinite(size),
    queryFn: ({ pageParam }) => fetchNotes(pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((count, page) => count + page.notes.length, 0)
      return loaded < lastPage.total ? allPages.length : undefined
    },
    staleTime: 30_000,
  })
}

/**
 * Detalle de una nota (`GET /api/notas/{id}`).
 * Reutiliza la nota de la lista como dato inicial para abrir sin espera.
 */
export function useNote(id: string | undefined) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: notesKeys.detail(id ?? ''),
    queryFn: () => fetchNote(id as string),
    enabled: Boolean(id),
    initialData: () => {
      if (!id) return undefined

      for (const [, page] of queryClient.getQueriesData<NotePage>({ queryKey: notesKeys.lists() })) {
        const found = page?.notes.find((note) => note.id === id)
        if (found) return found
      }

      for (const [, data] of queryClient.getQueriesData<{ pages: NotePage[] }>({
        queryKey: notesKeys.infinites(),
      })) {
        for (const page of data?.pages ?? []) {
          const found = page.notes.find((note) => note.id === id)
          if (found) return found
        }
      }

      return undefined
    },
  })
}
