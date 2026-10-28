// API pública de la feature `board` (tablero del inicio).
export { getMyBoard, updateBoard } from './api/boardApi'
export { boardKeys, useMyBoard, useUpdateBoard } from './hooks/useBoard'
export type { BoardResponse, UpdateBoardPayload, UpdateBoardResponse } from './types'
