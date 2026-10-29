import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { ArrowLeftIcon, LoaderIcon } from '@/components/ui/icons'
import { getCurrentUser } from '@/config'
import { ROUTES } from '@/config/routes'
import { fileToCover } from '@/features/dashboard/lib/image'
import { fullName, useProfile } from '@/features/profile'
import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'
import { useNotebookCoverStore } from '@/stores/notebookCoverStore'
import type { CoverDesign, CoverTemplate } from '@/stores/notebookCoverStore'

import { BookPreview } from '../components/BookPreview'
import { CoverContentFields } from '../components/CoverContentFields'
import { CoverLookPicker } from '../components/CoverLookPicker'
import { CoverStylePicker } from '../components/CoverStylePicker'
import { useCreateNotebook, useNotebook, useUpdateNotebook } from '../hooks/useNotebooks'
import { notebookColor } from '../lib/colors'
import { defaultCover, templateInfo } from '../lib/covers'
import type { Notebook, NotebookPayload } from '../types'

const FORM_ID = 'notebook-designer-form'

/**
 * Diseñador de cubiertas: pantalla completa con panel de ajustes y vista previa
 * en vivo. El nombre, el color y el orden van a la API; el diseño de la tapa
 * (estilo, acento e imagen) se guarda en el navegador.
 */
export function NotebookDesignerPage() {
  const { notebookId } = useParams()
  const editing = Boolean(notebookId)
  const navigate = useNavigate()

  const { data: notebook, isPending, isError, error } = useNotebook(notebookId)
  const { data: profile } = useProfile()
  const createNotebook = useCreateNotebook()
  const updateNotebook = useUpdateNotebook(notebookId ?? '')
  const storedCovers = useNotebookCoverStore((state) => state.covers)
  const setCover = useNotebookCoverStore((state) => state.setCover)

  const [nombre, setNombre] = useState('')
  const [color, setColor] = useState('azul')
  const [orden, setOrden] = useState('1')
  const [design, setDesign] = useState<CoverDesign>(() => defaultCover({ color: 'azul' }))
  const [hydrated, setHydrated] = useState(!editing)
  const [uploading, setUploading] = useState(false)
  const loadedFor = useRef<string | null>(null)

  useEffect(() => {
    if (!notebook || loadedFor.current === notebook.id) return
    loadedFor.current = notebook.id
    setNombre(notebook.nombre)
    setColor(notebook.color)
    setOrden(String(notebook.orden))
    setDesign(storedCovers[notebook.id] ?? defaultCover(notebook))
    setHydrated(true)
  }, [notebook, storedCovers])

  const author = fullName(profile) || 'Tu nombre'
  const parsedOrder = Number.parseInt(orden, 10)
  const orderNumber = Number.isFinite(parsedOrder) ? Math.max(0, parsedOrder) : 1
  const saving = createNotebook.isPending || updateNotebook.isPending

  const handleColor = (next: string) => {
    setColor(next)
    setDesign((current) => ({ ...current, color: notebookColor(next) }))
  }

  const handleTemplate = (template: CoverTemplate) => {
    setDesign((current) => ({
      ...current,
      template,
      accent: templateInfo(template).accent,
    }))
  }

  const handleImage = async (file: File) => {
    setUploading(true)
    try {
      const image = await fileToCover(file, 1200)
      setDesign((current) => ({ ...current, image }))
      toast.success('Imagen lista para la portada.')
    } catch {
      toast.error('No pudimos procesar esa imagen. Prueba con otra.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const idUsuario = notebook?.idUsuario ?? getCurrentUser().id
    if (!idUsuario) {
      toast.error('No pudimos identificar tu cuenta. Vuelve a iniciar sesión.')
      return
    }

    const name = nombre.trim()
    if (!name) {
      toast.error('Ponle un nombre al cuaderno.')
      return
    }

    const payload: NotebookPayload = {
      idUsuario,
      nombre: name,
      color,
      orden: orderNumber,
    }

    const onSuccess = (saved: Notebook) => {
      setCover(saved.id, design)
      toast.success(editing ? 'Cuaderno actualizado.' : 'Cuaderno creado.')
      navigate(ROUTES.notebooks)
    }
    const onError = (mutationError: Error) => toast.error(getErrorMessage(mutationError))

    if (notebook) updateNotebook.mutate(payload, { onSuccess, onError })
    else createNotebook.mutate(payload, { onSuccess, onError })
  }

  if (editing && isPending) {
    return (
      <div className="grid h-full place-items-center">
        <LoaderIcon className="h-6 w-6 animate-spin text-accent" />
      </div>
    )
  }

  if (editing && isError) {
    return (
      <div className="mx-auto flex h-full w-full max-w-lg flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold text-ink">No pudimos cargar el cuaderno</p>
        <p className="mt-1.5 text-sm text-muted">{getErrorMessage(error)}</p>
        <Button variant="secondary" className="mt-5" onClick={() => navigate(ROUTES.notebooks)}>
          Volver a cuadernos
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-canvas lg:overflow-hidden">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(ROUTES.notebooks)}
            aria-label="Volver a cuadernos"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-accent/40 hover:text-ink"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>

          <div className="min-w-0">
            <p className="hidden truncate font-mono text-[10px] uppercase tracking-[0.22em] text-muted sm:block">
              Diseñador de cubiertas
            </p>
            <h1 className="truncate text-sm font-semibold text-ink">
              {editing ? 'Editar cuaderno' : 'Nuevo cuaderno'}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(ROUTES.notebooks)}
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:bg-canvas hover:text-ink sm:inline-flex"
          >
            Cancelar
          </button>

          <Button type="submit" form={FORM_ID} disabled={saving || uploading}>
            {saving ? <LoaderIcon className="h-4 w-4 animate-spin" /> : null}
            {editing ? 'Guardar cambios' : 'Crear cuaderno'}
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="scroll-slim contain-paint order-2 w-full shrink-0 border-t border-line bg-surface lg:order-1 lg:h-full lg:w-[390px] lg:overflow-y-auto lg:border-r lg:border-t-0">
          <form id={FORM_ID} onSubmit={handleSubmit} noValidate className="space-y-6 p-5 sm:p-6">
            <CoverContentFields
              title={nombre}
              order={orden}
              author={author}
              onTitleChange={setNombre}
              onOrderChange={setOrden}
            />

            <CoverStylePicker value={design.template} color={design.color} onChange={handleTemplate} />

            <CoverLookPicker
              colorId={color}
              accent={design.accent}
              image={design.image}
              uploading={uploading}
              onColorChange={handleColor}
              onAccentChange={(accent) => setDesign((current) => ({ ...current, accent }))}
              onImageChange={handleImage}
              onImageRemove={() => setDesign((current) => ({ ...current, image: null }))}
            />

            <p className="text-[11px] leading-relaxed text-muted">
              El nombre, el color y el orden se guardan en tu cuenta. El estilo, el acento y la
              imagen de la tapa quedan guardados en este navegador.
            </p>
          </form>
        </aside>

        <section className="relative order-1 flex min-h-[360px] flex-1 items-center justify-center overflow-hidden px-6 py-12 lg:order-2 lg:min-h-0">
          <div aria-hidden className="absolute inset-0" style={{ backgroundColor: '#ece8df' }} />
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(60,50,40,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(60,50,40,0.06) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(90% 70% at 50% 42%, transparent 42%, rgba(60,50,40,0.12) 100%)',
            }}
          />

          <div className="absolute left-5 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8c8374]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c05a3a]" />
            Vista previa
            <span className="text-[#b7ae9f]">· en vivo</span>
          </div>
          <div className="absolute right-5 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#b7ae9f]">
            Nottia
          </div>

          <div className="relative animate-rise">
            {hydrated ? (
              <BookPreview
                title={nombre}
                order={orderNumber}
                author={author}
                design={design}
              />
            ) : (
              <div className="aspect-[3/4] w-[clamp(240px,30vw,380px)] animate-pulse rounded-lg bg-[#e2dccf]" />
            )}
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a59b8b]">
            3:4 · portada
          </p>
        </section>
      </div>
    </div>
  )
}
