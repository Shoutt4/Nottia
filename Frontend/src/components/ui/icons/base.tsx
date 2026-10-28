import type { SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>

/** Base común: trazo actual, sin relleno y decorativo. */
export function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}
