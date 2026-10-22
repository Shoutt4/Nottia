import { http } from '@/config'

import type { CreateNotePayload, Note, NotePage, UpdateNotePayload } from '../types'

type Raw = Record<string, unknown>

const str = (value: unknown): string | null =>
  typeof value === 'string' && value.trim().length > 0 ? value : null

const num = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) ? value : null

/** El backend responde `{ data, succes }`; si viene plano, se usa tal cual. */
function unwrap(body: unknown): unknown {
  if (body && typeof body === 'object' && 'data' in body) {
    return (body as Raw).data
  }
  return body
}

/**
 * Normaliza una nota aceptando los nombres habituales (`idNota`/`id`,
 * `titulo`, `contenido`, `updateAt`, `bloqueado`, `fijado`…).
 * Devuelve `null` si no hay id.
 */
function parseNote(raw: unknown): Note | null {
  if (!raw || typeof raw !== 'object') return null

  const source = raw as Raw
  const id = str(source.idNota) ?? str(source.id)
  if (!id) return null

  const cuaderno = source.cuaderno
  const cuadernoName =
    typeof cuaderno === 'string'
      ? str(cuaderno)
      : cuaderno && typeof cuaderno === 'object'
        ? str((cuaderno as Raw).nombre)
        : null

  return {
    id,
    idCuaderno:
      str(source.idCuaderno) ??
      (cuaderno && typeof cuaderno === 'object'
        ? str((cuaderno as Raw).idCuaderno) ?? str((cuaderno as Raw).id)
        : null),
    notebook: str(source.nombreCuaderno) ?? cuadernoName ?? 'Notas',
    title: str(source.titulo) ?? '',
    content: str(source.contenido) ?? '',
    updatedAt: str(source.updateAt) ?? str(source.updatedAt) ?? str(source.createAt) ?? '',
    locked: source.bloqueado === true,
    pinned: source.fijado === true,
  }
}

function parsePage(raw: unknown): NotePage {
  if (Array.isArray(raw)) {
    const notes = raw.map(parseNote).filter((note): note is Note => note !== null)
    return { notes, page: 0, size: notes.length, total: notes.length, totalPages: 1 }
  }

  const source = (raw ?? {}) as Raw
  const items = source.content ?? source.items ?? source.notas ?? []
  const notes = Array.isArray(items)
    ? items.map(parseNote).filter((note): note is Note => note !== null)
    : []

  return {
    notes,
    page: num(source.number ?? source.page) ?? 0,
    size: num(source.size) ?? notes.length,
    total: num(source.totalElements ?? source.total ?? source.totalItems) ?? notes.length,
    totalPages: num(source.totalPages) ?? 1,
  }
}

/** `POST /api/notas/save` — crea una nota del usuario del token. */
export async function createNoteRequest(payload: CreateNotePayload): Promise<Note | null> {
  const { data } = await http.post<unknown>('/api/notas/save', payload)
  return parseNote(unwrap(data))
}

/** `PUT /api/notas/update/{id}` — autoguardado de la nota. */
export async function updateNoteRequest(id: string, payload: UpdateNotePayload): Promise<void> {
  await http.put(`/api/notas/update/${encodeURIComponent(id)}`, payload)
}

/** `GET /api/notas/{id}`. */
export async function fetchNote(id: string): Promise<Note> {
  const { data } = await http.get<unknown>(`/api/notas/${encodeURIComponent(id)}`)
  const note = parseNote(unwrap(data))
  if (!note) throw new Error('No pudimos leer la nota.')
  return note
}

/** `GET /api/notas/all?page=&size=`. */
export async function fetchNotes(page = 0, size = 20): Promise<NotePage> {
  const { data } = await http.get<unknown>('/api/notas/all', { params: { page, size } })
  return parsePage(unwrap(data))
}
