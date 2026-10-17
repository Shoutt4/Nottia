import { useId } from 'react'

import { cn } from '@/lib/utils'

interface LogoProps {
  /** Tamaño en píxeles (cuadrado). */
  size?: number
  className?: string
}

/**
 * Marca de Nottia (nota con clip). Mismo dibujo que `public/favicon.svg`.
 * El id del gradiente se genera por instancia para poder repetir el logo.
 */
export function Logo({ size = 32, className }: LogoProps) {
  const gradientId = `nottia-note-${useId().replace(/:/g, '')}`

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn('shrink-0', className)}
      role="img"
      aria-label="Nottia"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b6bff" />
          <stop offset="1" stopColor="#6a48f0" />
        </linearGradient>
      </defs>
      <g transform="rotate(-7 30 32)">
        <path
          d="M22 11h19a7 7 0 0 1 7 7v15L33 50H22a7 7 0 0 1-7-7V18a7 7 0 0 1 7-7Z"
          fill={`url(#${gradientId})`}
        />
        <path d="M48 33v17H33Z" fill="#c6b8ff" />
        <rect x="21" y="20" width="19" height="4" rx="2" fill="#ffffff" />
        <rect x="21" y="28" width="15" height="4" rx="2" fill="#ffffff" opacity="0.85" />
        <rect x="21" y="36" width="11" height="4" rx="2" fill="#ffffff" opacity="0.7" />
        <path
          d="M38 23a8 8 0 0 1 16 0c0 3 1.6 4.8 1.6 4.8a1.2 1.2 0 0 1-1 1.9H37.4a1.2 1.2 0 0 1-1-1.9c0 0 1.6-1.8 1.6-4.8Z"
          fill="#b7a1ff"
        />
        <path d="M43 31a3 3 0 0 0 6 0Z" fill="#b7a1ff" />
      </g>
      <path d="M59 15l3-4" stroke="#8b6bff" strokeWidth={3} strokeLinecap="round" />
      <path d="M57 24h4" stroke="#8b6bff" strokeWidth={3} strokeLinecap="round" />
    </svg>
  )
}
