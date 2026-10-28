import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { NotebookIcon, PencilIcon, PlusIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { getErrorMessage } from '@/lib/errors'

import { NotebookDialog } from '../components/NotebookDialog'
import { useNotebooks } from '../hooks/useNotebooks'
import { notebookColor } from '../lib/colors'
import type { Notebook } from '../types'

/** Tarjeta de un cuaderno con acceso a edición. */
function NotebookCard({ notebook, onEdit }: { notebook: Notebook; onEdit: () => void }) {
  const accent = notebookColor(notebook.color)

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-4 transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_18px_40px_-30px_var(--color-accent)]">
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid h-10 w-10 place-items-center rounded-xl"
          style={{ backgroundColor: `${accent}1f`, color: accent }}
        >
          <NotebookIcon className="h-5 w-5" />
        </span>

        <button
          type="button"
          onClick={onEdit}
          aria-label={`Editar ${notebook.nombre}`}
          title="Editar cuaderno"
          className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-canvas hover:text-ink"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
      </div>

      <h2 className="mt-3 truncate text-sm font-semibold text-ink">{notebook.nombre}</h2>
      <p className="mt-1 text-xs text-muted">Orden {notebook.orden}</p>
    </article>
  )
}

/** Biblioteca de cuadernos: lista, crea y edita (`/api/cuaderno/...`). */
export function NotebooksPage() {
  const { data, isPending, isError, error } = useNotebooks()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Notebook | null>(null)

  const notebooks = data?.notebooks ?? []

  const openCreate = () => {
    setEditing(null)
    setOpen(true)
  }

  const openEdit = (notebook: Notebook) => {
    setEditing(notebook)
    setOpen(true)
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-5 sm:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-muted">Biblioteca</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Tus cuadernos</h1>
            <p className="mt-1 text-sm text-muted">
              Organiza tus notas por temas, proyectos o materias.
            </p>
          </div>

          <Button onClick={openCreate}>
            <PlusIcon className="h-4 w-4" />
            Nuevo cuaderno
          </Button>
        </div>
      </Reveal>

      {isPending ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl border border-line bg-surface"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-3xl border border-line bg-surface px-6 py-12 text-center">
          <p className="text-sm font-semibold text-ink">No pudimos cargar tus cuadernos</p>
          <p className="mx-auto mt-1.5 max-w-sm text-pretty text-sm text-muted">
            {getErrorMessage(error)}
          </p>
        </div>
      ) : notebooks.length === 0 ? (
        <div className="rounded-3xl border border-line bg-surface px-6 py-14 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
            <NotebookIcon className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm font-semibold text-ink">Todavía no tienes cuadernos</p>
          <p className="mx-auto mt-1.5 max-w-sm text-pretty text-sm text-muted">
            Crea el primero para separar tus notas por tema.
          </p>
          <Button onClick={openCreate} className="mt-5">
            <PlusIcon className="h-4 w-4" />
            Crear cuaderno
          </Button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {notebooks.map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} onEdit={() => openEdit(notebook)} />
          ))}
        </div>
      )}

      {open && <NotebookDialog notebook={editing ?? undefined} onClose={() => setOpen(false)} />}
    </div>
  )
}
