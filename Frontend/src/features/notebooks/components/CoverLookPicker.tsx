import type { ChangeEvent } from 'react'

import { CheckIcon, ImageIcon, LoaderIcon, XIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

import { NOTEBOOK_COLORS } from '../lib/colors'
import { contrastInk, COVER_ACCENTS } from '../lib/covers'
import { DesignerSection } from './DesignerSection'

interface CoverLookPickerProps {
  /** Color del backend (`azul`, `naranja`, …). */
  colorId: string
  accent: string
  image: string | null
  uploading: boolean
  onColorChange: (id: string) => void
  onAccentChange: (hex: string) => void
  onImageChange: (file: File) => void
  onImageRemove: () => void
}

/** Color del cuaderno, acento del arte e imagen de fondo. */
export function CoverLookPicker({
  colorId,
  accent,
  image,
  uploading,
  onColorChange,
  onAccentChange,
  onImageChange,
  onImageRemove,
}: CoverLookPickerProps) {
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onImageChange(file)
    event.target.value = ''
  }

  return (
    <>
      <DesignerSection badge="C" title="Color y acabado" hint="El color del cuaderno y su acento">
        <div className="flex flex-wrap gap-2">
          {NOTEBOOK_COLORS.map((item) => {
            const active = colorId === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onColorChange(item.id)}
                aria-label={`Color ${item.label}`}
                aria-pressed={active}
                title={item.label}
                className={cn(
                  'relative grid h-8 w-8 place-items-center rounded-full transition duration-200',
                  active
                    ? 'ring-2 ring-accent ring-offset-2 ring-offset-surface'
                    : 'hover:scale-110',
                )}
                style={{ backgroundColor: item.value }}
              >
                {active ? (
                  <CheckIcon className="h-3.5 w-3.5" style={{ color: contrastInk(item.value) }} />
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Acento del arte
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {COVER_ACCENTS.map((hex) => {
              const active = accent.toLowerCase() === hex.toLowerCase()

              return (
                <button
                  key={hex}
                  type="button"
                  onClick={() => onAccentChange(hex)}
                  aria-label={`Acento ${hex}`}
                  aria-pressed={active}
                  className={cn(
                    'h-5 w-5 rounded-full border border-line transition duration-200',
                    active ? 'ring-2 ring-ink/60 ring-offset-1 ring-offset-surface' : 'hover:scale-110',
                  )}
                  style={{ backgroundColor: hex }}
                />
              )
            })}
          </div>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          El color se guarda en tu cuaderno; el acento y la imagen viven en este navegador.
        </p>
      </DesignerSection>

      <DesignerSection badge="I" title="Imagen de fondo" hint="Opcional, se recorta a la tapa">
        {image ? (
          <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas p-2 pr-3">
            <span
              className="h-14 w-11 shrink-0 rounded-md bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-ink">Imagen aplicada</p>
              <p className="mt-0.5 text-[11px] text-muted">Se ve detrás del título.</p>
            </div>
            <button
              type="button"
              onClick={onImageRemove}
              aria-label="Quitar imagen"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-surface hover:text-danger"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-line px-3 py-3 transition-colors duration-200 hover:border-accent/50 hover:bg-canvas',
              uploading && 'pointer-events-none opacity-60',
            )}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
              {uploading ? (
                <LoaderIcon className="h-4 w-4 animate-spin" />
              ) : (
                <ImageIcon className="h-4 w-4" />
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-ink">Subir una imagen</span>
              <span className="block text-[11px] text-muted">JPG o PNG · opcional</span>
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              disabled={uploading}
              className="sr-only"
            />
          </label>
        )}
      </DesignerSection>
    </>
  )
}
