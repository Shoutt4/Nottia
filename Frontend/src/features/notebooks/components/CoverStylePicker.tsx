import { cn } from '@/lib/utils'
import type { CoverTemplate } from '@/stores/notebookCoverStore'

import { COVER_TEMPLATES, resolveCoverStyle } from '../lib/covers'
import { DesignerSection } from './DesignerSection'

interface CoverStylePickerProps {
  value: CoverTemplate
  /** Color principal actual para que las miniaturas sean fieles. */
  color: string
  onChange: (template: CoverTemplate) => void
}

/** Selección del estilo de tapa con miniaturas en vivo. */
export function CoverStylePicker({ value, color, onChange }: CoverStylePickerProps) {
  return (
    <DesignerSection badge="P" title="Estilo de tapa" hint="Composición y acabado">
      <div className="grid grid-cols-3 gap-2">
        {COVER_TEMPLATES.map((template) => {
          const active = value === template.id
          const style = resolveCoverStyle({
            template: template.id,
            color,
            accent: template.accent,
            image: null,
          })

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onChange(template.id)}
              aria-pressed={active}
              className={cn(
                'rounded-xl border p-1.5 text-left transition duration-200',
                active
                  ? 'border-accent ring-2 ring-accent/20'
                  : 'border-line hover:border-accent/40',
              )}
            >
              <span
                className="relative block aspect-[3/4] w-full overflow-hidden rounded-md"
                style={{ background: style.background }}
              >
                <span
                  className="absolute left-1.5 top-1.5 h-0.5 w-4 rounded-full"
                  style={{ backgroundColor: style.accent }}
                />
                <span
                  className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: style.accent, opacity: 0.8 }}
                />
                <span
                  className="absolute bottom-1.5 left-1.5 right-1.5 h-1 rounded-full"
                  style={{ backgroundColor: style.ink, opacity: 0.6 }}
                />
                <span
                  className="absolute bottom-4 left-1.5 h-1 w-2/3 rounded-full"
                  style={{ backgroundColor: style.ink, opacity: 0.25 }}
                />
              </span>

              <span className="mt-1.5 block text-[11px] font-semibold text-ink">
                {template.label}
              </span>
              <span className="block text-[10px] text-muted">{template.hint}</span>
            </button>
          )
        })}
      </div>
    </DesignerSection>
  )
}
