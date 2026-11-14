import { cn } from '@/lib/utils'

import type { ActivityDraft, DraftErrors } from '../hooks/useActivityDrafts'
import { ACTIVITY_COLORS, activityColor } from '../lib/colors'
import { API_DAYS, dayLabel } from '../lib/days'
import type { ApiDay } from '../types'

interface ActivityDraftCardProps {
  draft: ActivityDraft
  index: number
  editing: boolean
  canRemove: boolean
  errors: DraftErrors
  onChange: (id: string, patch: Partial<ActivityDraft>) => void
  onToggleDay: (id: string, day: ApiDay) => void
  onDuplicate: (id: string) => void
  onRemove: (id: string) => void
}

const INPUT_CLASS =
  'mt-1.5 w-full rounded-md border border-paper-line bg-desk/30 px-3 py-2.5 text-sm text-paper-ink outline-none transition-colors duration-200 placeholder:text-paper-muted/60 focus:border-paper-accent focus:ring-2 focus:ring-paper-accent/20'

export function ActivityDraftCard({
  draft,
  index,
  editing,
  canRemove,
  errors,
  onChange,
  onToggleDay,
  onDuplicate,
  onRemove,
}: ActivityDraftCardProps) {
  return (
    <article className="rounded-[6px] border border-paper-line bg-paper/70 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
            {editing ? 'Editar bloque' : `Actividad ${index + 1}`}
          </p>
          <p className="mt-1 text-sm font-semibold text-paper-ink">
            {draft.name.trim() || 'Nueva actividad'}
          </p>
        </div>

        {!editing ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onDuplicate(draft.id)}
              className="rounded-md px-2 py-1 text-[11px] font-medium text-paper-muted transition-colors hover:bg-desk/60 hover:text-paper-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Duplicar
            </button>
            {canRemove ? (
              <button
                type="button"
                onClick={() => onRemove(draft.id)}
                className="rounded-md px-2 py-1 text-[11px] font-medium text-paper-muted transition-colors hover:bg-danger-soft hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
              >
                Quitar
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="text-xs font-semibold text-paper-ink">Nombre</span>
          <input
            type="text"
            value={draft.name}
            onChange={(event) => onChange(draft.id, { name: event.target.value })}
            placeholder="Ej. Estudiar inglés"
            maxLength={80}
            aria-invalid={Boolean(errors.name)}
            className={cn(INPUT_CLASS, errors.name && 'border-danger focus:border-danger')}
          />
          {errors.name ? <FieldError>{errors.name}</FieldError> : null}
        </label>

        <label className="sm:col-span-2">
          <span className="text-xs font-semibold text-paper-ink">Descripción</span>
          <textarea
            value={draft.description}
            onChange={(event) => onChange(draft.id, { description: event.target.value })}
            placeholder="Una nota breve para recordar el contexto"
            rows={2}
            maxLength={300}
            aria-invalid={Boolean(errors.description)}
            className={cn(INPUT_CLASS, 'resize-none', errors.description && 'border-danger')}
          />
          {errors.description ? <FieldError>{errors.description}</FieldError> : null}
        </label>

        <div className="sm:col-span-2">
          <span className="text-xs font-semibold text-paper-ink">Color</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {ACTIVITY_COLORS.map((color) => {
              const selected = draft.color === color.id
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => onChange(draft.id, { color: color.id })}
                  aria-label={color.label}
                  aria-pressed={selected}
                  title={color.label}
                  className={cn(
                    'grid h-8 w-8 place-items-center rounded-full border-2 transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                    selected
                      ? 'scale-110 border-paper-ink shadow-sm'
                      : 'border-transparent hover:scale-105',
                  )}
                  style={{ backgroundColor: color.soft, boxShadow: `inset 0 0 0 1px ${color.border}` }}
                >
                  {selected ? (
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: color.ink }}
                    />
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        <div className="sm:col-span-2">
          <span className="text-xs font-semibold text-paper-ink">
            {editing ? 'Día' : 'Días'}
          </span>
          <p className="mt-0.5 text-[11px] text-paper-muted">
            {editing ? 'Cambia el día de este bloque.' : 'Puedes marcar varios días para el mismo horario.'}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {API_DAYS.map((day) => {
              const selected = draft.days.includes(day)
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onToggleDay(draft.id, day)}
                  aria-pressed={selected}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                    selected
                      ? 'border-paper-accent bg-paper-accent/10 text-paper-accent'
                      : 'border-paper-line text-paper-muted hover:border-paper-accent/50 hover:text-paper-ink',
                  )}
                >
                  {dayLabel(day)}
                </button>
              )
            })}
          </div>
          {errors.days ? <FieldError>{errors.days}</FieldError> : null}
        </div>

        <label>
          <span className="text-xs font-semibold text-paper-ink">Hora de inicio</span>
          <input
            type="time"
            step={60}
            value={draft.start}
            onChange={(event) => onChange(draft.id, { start: event.target.value })}
            aria-invalid={Boolean(errors.start)}
            className={cn(INPUT_CLASS, errors.start && 'border-danger')}
          />
          {errors.start ? <FieldError>{errors.start}</FieldError> : null}
        </label>

        <label>
          <span className="text-xs font-semibold text-paper-ink">Hora de fin</span>
          <input
            type="time"
            step={60}
            value={draft.end}
            onChange={(event) => onChange(draft.id, { end: event.target.value })}
            aria-invalid={Boolean(errors.end)}
            className={cn(INPUT_CLASS, errors.end && 'border-danger')}
          />
          {errors.end ? <FieldError>{errors.end}</FieldError> : null}
        </label>
      </div>

      <div
        aria-hidden
        className="mt-4 h-1 w-12 rounded-full"
        style={{ backgroundColor: activityColor(draft.color).border }}
      />
    </article>
  )
}

function FieldError({ children }: { children: string }) {
  return <p className="mt-1.5 text-xs font-medium text-danger">{children}</p>
}
