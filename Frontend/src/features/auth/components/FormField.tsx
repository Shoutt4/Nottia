import { useState } from 'react'
import type { ReactNode } from 'react'

import { EyeIcon, EyeOffIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  autoComplete?: string
  maxLength?: number
  icon: ReactNode
}

/**
 * Campo con etiqueta flotante, ícono, estado de foco y error animado.
 * Si `type` es `password` incluye el botón para mostrar/ocultar.
 */
export function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  maxLength,
  icon,
}: FormFieldProps) {
  const [focused, setFocused] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const isPassword = type === 'password'
  const floating = focused || value.length > 0
  const errorId = `${id}-error`

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={isPassword && !revealed ? 'password' : type}
          value={value}
          autoComplete={autoComplete}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false)
            onBlur?.()
          }}
          className={cn(
            'h-14 w-full rounded-md border bg-desk/40 pb-1.5 pl-11 pt-5 text-sm text-paper-ink outline-none transition-all duration-200',
            isPassword ? 'pr-11' : 'pr-4',
            error
              ? 'border-danger focus:border-danger focus:ring-4 focus:ring-danger/15'
              : 'border-paper-line focus:border-paper-accent focus:ring-4 focus:ring-paper-accent/15',
          )}
        />

        <span
          className={cn(
            'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200',
            focused ? 'text-paper-accent' : 'text-paper-muted',
          )}
        >
          {icon}
        </span>

        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute left-11 origin-left transition-all duration-200',
            floating ? 'top-2 text-[11px] font-medium' : 'top-1/2 -translate-y-1/2 text-sm',
            error ? 'text-danger' : focused ? 'text-paper-accent' : 'text-paper-muted',
          )}
        >
          {label}
        </label>

        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((current) => !current)}
            aria-label={revealed ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-paper-muted transition-colors hover:text-paper-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {revealed ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className="animate-rise mt-1.5 pl-1 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
