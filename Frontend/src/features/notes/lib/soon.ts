import { toast } from '@/lib/toast'

/** Acción de maqueta: avisa que la función llegará más adelante. */
export const soon = () => toast.info('Esta acción estará disponible pronto.')
