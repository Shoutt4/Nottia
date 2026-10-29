import { DesignerSection } from './DesignerSection'

interface CoverContentFieldsProps {
  title: string
  order: string
  author: string
  onTitleChange: (value: string) => void
  onOrderChange: (value: string) => void
}

/** Título, autor de la cuenta y orden del cuaderno. */
export function CoverContentFields({
  title,
  order,
  author,
  onTitleChange,
  onOrderChange,
}: CoverContentFieldsProps) {
  return (
    <DesignerSection badge="T" title="Contenido" hint="Lo que se lee en la tapa">
      <label className="block">
        <span className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Título
          <span className="font-mono text-[10px] font-normal tracking-normal">
            {title.length}/48
          </span>
        </span>

        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value.slice(0, 48))}
          placeholder="Ideas sueltas"
          aria-label="Título del cuaderno"
          className="mt-1 w-full border-0 border-b border-line bg-transparent px-0 py-2 text-ink outline-none transition-colors duration-200 placeholder:text-muted/45 focus:border-accent"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '1.6rem' }}
        />
      </label>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Autor</p>
          <p className="mt-1 truncate text-sm font-medium text-ink">{author || 'Tu nombre'}</p>
          <p className="mt-0.5 text-[11px] text-muted">Se toma de tu cuenta.</p>
        </div>

        <label className="w-24 shrink-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Orden
          </span>
          <input
            type="number"
            min={0}
            value={order}
            onChange={(event) => onOrderChange(event.target.value)}
            aria-label="Orden del cuaderno"
            className="mt-1 w-full rounded-lg border border-line bg-canvas px-2.5 py-1.5 text-sm text-ink outline-none transition-colors duration-200 focus:border-accent"
          />
        </label>
      </div>
    </DesignerSection>
  )
}
