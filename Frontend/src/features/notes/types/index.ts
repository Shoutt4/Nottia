/** Una nota tal como se muestra en el inicio y en el editor (aún sin backend). */
export interface Note {
  id: string
  /** Cuaderno al que pertenece. */
  notebook: string
  /** Vacío = nota sin título. */
  title: string
  /** Cuerpo completo; la vista previa se deriva de aquí. */
  content: string
  /** ISO 8601; se usa para el "hace X". */
  updatedAt: string
  /** Indicador visual de nota protegida. */
  locked?: boolean
}
