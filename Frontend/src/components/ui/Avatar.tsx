import { useState } from 'react'

import { cn, getInitials } from '@/lib/utils'

interface AvatarProps {
  name: string
  /** URL de la foto (`urlAvatar`); si falta o falla la carga, se muestran las iniciales. */
  src?: string | null
  /** Tamaño y estilos del contenedor (ej. `h-9 w-9 text-xs`). */
  className?: string
  /** Punto de estado en la esquina inferior derecha. */
  showStatus?: boolean
}

/** Avatar con foto y respaldo de iniciales. */
export function Avatar({ name, src, className, showStatus = false }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const withImage = Boolean(src) && !failed

  return (
    <span className={cn('relative inline-grid shrink-0 place-items-center', className)}>
      <span className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-gradient-to-br from-accent to-accent-2 font-semibold text-on-accent">
        {withImage ? (
          <img
            src={src ?? undefined}
            alt={name}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          getInitials(name)
        )}
      </span>

      {showStatus && (
        <span
          aria-hidden
          className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-accent-2"
        />
      )}
    </span>
  )
}
