import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getMyBoard, updateBoard } from '../api/boardApi'
import type { UpdateBoardPayload } from '../types'

export const boardKeys = {
  all: ['board'] as const,
  mine: () => [...boardKeys.all, 'me'] as const,
}

/**
 * Tablero del usuario (`GET /api/tablero/byme`).
 * `retry: false` porque si el usuario aún no tiene tablero el backend puede
 * responder 404; el Inicio cae a su título por defecto.
 */
export function useMyBoard() {
  return useQuery({
    queryKey: boardKeys.mine(),
    queryFn: getMyBoard,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}

/** Guarda el tablero (`PUT /api/tablero/update`) y refresca la caché. */
export function useUpdateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateBoardPayload) => updateBoard(payload),
    onSuccess: (board) => {
      queryClient.setQueryData(boardKeys.mine(), board)
    },
  })
}
