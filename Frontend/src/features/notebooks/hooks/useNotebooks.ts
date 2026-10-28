import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createNotebookRequest,
  fetchNotebook,
  fetchNotebooks,
  updateNotebookRequest,
} from '../api/notebooksApi'
import type { NotebookPayload } from '../types'

/** Cuadernos por página en el listado. */
export const NOTEBOOKS_PAGE_SIZE = 20

export const notebooksKeys = {
  all: ['notebooks'] as const,
  lists: () => [...notebooksKeys.all, 'list'] as const,
  list: (page: number, size: number, sort: string) =>
    [...notebooksKeys.lists(), page, size, sort] as const,
  detail: (id: string) => [...notebooksKeys.all, 'detail', id] as const,
}

/** Cuadernos del usuario, ordenados por `orden` (`GET /api/cuaderno/all`). */
export function useNotebooks(page = 0, size = NOTEBOOKS_PAGE_SIZE, sort = 'orden') {
  return useQuery({
    queryKey: notebooksKeys.list(page, size, sort),
    queryFn: () => fetchNotebooks(page, size, sort),
    staleTime: 60_000,
  })
}

/** Detalle de un cuaderno (`GET /api/cuaderno/detaills/{id}`). */
export function useNotebook(id: string | undefined) {
  return useQuery({
    queryKey: notebooksKeys.detail(id ?? ''),
    queryFn: () => fetchNotebook(id as string),
    enabled: Boolean(id),
    staleTime: 60_000,
  })
}

/** Crea un cuaderno (`POST /api/cuaderno/create`). */
export function useCreateNotebook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: NotebookPayload) => createNotebookRequest(payload),
    onSuccess: (notebook) => {
      queryClient.setQueryData(notebooksKeys.detail(notebook.id), notebook)
      queryClient.invalidateQueries({ queryKey: notebooksKeys.lists() })
    },
  })
}

/** Actualiza un cuaderno (`PUT /api/cuaderno/update/{id}`). */
export function useUpdateNotebook(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: NotebookPayload) => updateNotebookRequest(id, payload),
    onSuccess: (notebook) => {
      queryClient.setQueryData(notebooksKeys.detail(id), notebook)
      queryClient.invalidateQueries({ queryKey: notebooksKeys.lists() })
    },
  })
}
