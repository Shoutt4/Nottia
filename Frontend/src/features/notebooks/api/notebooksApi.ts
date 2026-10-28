import { http } from '@/config'

import type {
  Notebook,
  NotebookPage,
  NotebookPayload,
  NotebookResponse,
  PageResponse,
} from '../types'

/** Traduce la respuesta del backend al modelo de la interfaz. */
function toNotebook(dto: NotebookResponse): Notebook {
  return {
    id: dto.idCuader,
    idUsuario: dto.idUsuario,
    nombre: dto.nombre,
    color: dto.color,
    orden: dto.orden,
    createdAt: dto.createAt,
    updatedAt: dto.updateAt,
  }
}

/** `POST /api/cuaderno/create`. */
export async function createNotebookRequest(payload: NotebookPayload): Promise<Notebook> {
  const { data } = await http.post<NotebookResponse>('/api/cuaderno/create', payload)
  return toNotebook(data)
}

/** `PUT /api/cuaderno/update/{id}`. */
export async function updateNotebookRequest(
  id: string,
  payload: NotebookPayload,
): Promise<Notebook> {
  const { data } = await http.put<NotebookResponse>(
    `/api/cuaderno/update/${encodeURIComponent(id)}`,
    payload,
  )
  return toNotebook(data)
}

/** `GET /api/cuaderno/detaills/{id}`. */
export async function fetchNotebook(id: string): Promise<Notebook> {
  const { data } = await http.get<NotebookResponse>(
    `/api/cuaderno/detaills/${encodeURIComponent(id)}`,
  )
  return toNotebook(data)
}

/** `GET /api/cuaderno/all?page=&size=&sort=`. */
export async function fetchNotebooks(
  page = 0,
  size = 20,
  sort = 'orden',
): Promise<NotebookPage> {
  const { data } = await http.get<PageResponse<NotebookResponse>>('/api/cuaderno/all', {
    params: { page, size, sort },
  })

  return {
    notebooks: data.content.map(toNotebook),
    page: data.number,
    size: data.size,
    total: data.totalElements,
    totalPages: data.totalPages,
  }
}
