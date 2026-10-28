import { useNavigate } from 'react-router-dom'

import { getCurrentUser } from '@/config'
import { notePath } from '@/config/routes'
import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'

import { useCreateNote } from './useNoteMutations'

/**
 * Crea una nota vacía y abre el editor. `notebookId` se reutiliza como cuaderno
 * por defecto hasta que exista el API de cuadernos.
 */
export function useNewNote(notebookId?: string | null) {
  const navigate = useNavigate()
  const createNote = useCreateNote()

  const create = () => {
    const idUsuario = getCurrentUser().id
    if (!idUsuario) {
      toast.error('No pudimos identificar tu cuenta. Vuelve a iniciar sesión.')
      return
    }

    createNote.mutate(
      {
        idCuaderno: notebookId ?? null,
        idUsuario,
        titulo: '',
        contenido: '',
        bloqueado: false,
        fijado: false,
      },
      {
        onSuccess: (note) => navigate(notePath(note.id)),
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    )
  }

  return { create, isPending: createNote.isPending }
}
