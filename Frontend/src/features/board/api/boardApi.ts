import { http } from '@/config'

import type { BoardResponse, UpdateBoardPayload, UpdateBoardResponse } from '../types'

/** `GET /api/tablero/byme` — tablero del usuario dueño del token. */
export async function getMyBoard(): Promise<BoardResponse> {
  const { data } = await http.get<BoardResponse>('/api/tablero/byme')
  return data
}

/** `PUT /api/tablero/update` — guarda título y portada del tablero. */
export async function updateBoard(payload: UpdateBoardPayload): Promise<BoardResponse> {
  const { data } = await http.put<UpdateBoardResponse>('/api/tablero/update', payload)
  return data.data
}
