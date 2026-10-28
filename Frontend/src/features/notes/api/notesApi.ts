import { isAxiosError } from 'axios'

import { http } from '@/config'

import type {
  CreateNotePayload,
  NotaResponse,
  Note,
  NotePage,
  PageResponse,
  SaveNotaResponse,
  UpdateNotePayload,
} from '../types'

const NOTEBOOK_LABEL = 'Notas'

/** Traduce `NotasResponse` (backend) al modelo de la interfaz. */
function toNote(dto: NotaResponse): Note {
  return {
    id: dto.idNota,
    idCuaderno: dto.idCuaderno,
    notebook: NOTEBOOK_LABEL,
    title: dto.titulo ?? '',
    content: dto.contenido ?? '',
    // El backend todavía no rellena las fechas de la nota.
    updatedAt: dto.updateAt ?? dto.createAt ?? '',
    locked: dto.bloqueado,
    pinned: dto.fijado,
  }
}

/** `POST /api/notas/save` — crea una nota del usuario del token. */
export async function createNoteRequest(payload: CreateNotePayload): Promise<Note> {
  const { data } = await http.post<SaveNotaResponse>('/api/notas/save', payload)
  return toNote(data.data)
}

/** `PUT /api/notas/update/{id}` — guarda los cambios de la nota. */
export async function updateNoteRequest(id: string, payload: UpdateNotePayload): Promise<Note> {
  const { data } = await http.put<NotaResponse>(`/api/notas/update/${encodeURIComponent(id)}`, payload)
  return toNote(data)
}

/** `GET /api/notas/{id}`. */
export async function fetchNote(id: string): Promise<Note> {
  const { data } = await http.get<NotaResponse>(`/api/notas/${encodeURIComponent(id)}`)
  return toNote(data)
}

/**
 * `GET /api/notas/all?page=&size=`.
 * El backend responde **404** cuando el usuario todavía no tiene notas; para la
 * interfaz eso es una lista vacía, no un error.
 */
export async function fetchNotes(page = 0, size = 20): Promise<NotePage> {
  try {
    const { data } = await http.get<PageResponse<NotaResponse>>('/api/notas/all', {
      params: { page, size },
    })

    return {
      notes: data.content.map(toNote),
      page: data.number,
      size: data.size,
      total: data.totalElements,
      totalPages: data.totalPages,
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return { notes: [], page, size, total: 0, totalPages: 0 }
    }
    throw error
  }
}
