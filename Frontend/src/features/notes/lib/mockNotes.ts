import type { Note } from '../types'

const minutes = 60_000
const hours = 60 * minutes
const days = 24 * hours

const ago = (ms: number) => new Date(Date.now() - ms).toISOString()

/** Notas de ejemplo: semilla del store local mientras no existe el endpoint. */
export const mockNotes: Note[] = [
  {
    id: 'note-1',
    notebook: 'Notas diarias',
    title: 'Diario - Hoy',
    content:
      '☀️ Por la mañana: revisar el tablero, elegir tres prioridades y escribir sin distracciones.\n\n🎯 Objetivos:\n· Terminar la vista de inicio\n· Repasar el editor\n· Agendar la semana',
    updatedAt: ago(2 * minutes),
  },
  {
    id: 'note-2',
    notebook: 'Notas diarias',
    title: 'Diario - 14/10/2025',
    content:
      '☀️ Por la mañana: revisar el tablero, elegir tres prioridades y escribir sin distracciones.\n\n📝 Notas rápidas: la semana pasada se fue entre reuniones; hoy toca recuperar el foco.',
    updatedAt: ago(35 * minutes),
  },
  {
    id: 'note-3',
    notebook: 'Primer cuaderno',
    title: 'Resultado de la reescritura para IA',
    content:
      'Introducción: en medio del vibrante proceso electoral de Bolivia para 2025, nos encontramos ante una encrucijada que redefine el rumbo del país.',
    updatedAt: ago(1 * days),
  },
  {
    id: 'note-4',
    notebook: 'Primer cuaderno',
    title: 'Ideas para Nottia',
    content:
      '· Modo enfoque con temporizador\n· Atajos de teclado para crear notas\n· Sincronización sin conexión\n· Vista de calendario\n· Plantillas reutilizables',
    updatedAt: ago(2 * days),
    locked: true,
  },
  {
    id: 'note-5',
    notebook: 'Primer cuaderno',
    title: '',
    content: '',
    updatedAt: ago(6 * days),
  },
]
