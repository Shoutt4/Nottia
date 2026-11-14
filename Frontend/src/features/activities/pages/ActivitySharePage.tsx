import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { LogoWordmark } from '@/components/brand/LogoWordmark'
import { DownloadIcon, PrinterIcon } from '@/components/ui/icons'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { buttonClass } from '@/components/ui/buttonStyles'
import { ROUTES } from '@/config/routes'
import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'

import { ScheduleBoard } from '../components/ScheduleBoard'
import { downloadScheduleImage } from '../lib/scheduleImage'
import { readSharePayload, sharedToActivity } from '../lib/share'
import { todayLabel } from '../lib/time'

const PRINT_STYLE = `
  @media print {
    @page { size: landscape; margin: 10mm; }
    html, body { background: #ffffff !important; }
    .activity-share {
      --color-canvas: #ffffff;
      --color-surface: #ffffff;
      --color-line: #e9e5f3;
      --color-ink: #211c31;
      --color-muted: #6c6580;
      --color-accent: #7c5cfc;
      --color-on-accent: #ffffff;
      --color-paper: #fbf8f0;
      --color-paper-ink: #29251e;
      --color-paper-muted: #8b8170;
      --color-paper-line: #e4dccb;
      --color-paper-accent: #b45a39;
      --color-desk: #e9e2d4;
    }
  }
`

/** Vista pública de solo lectura que se abre desde «Compartir». */
export function ActivitySharePage() {
  const [searchParams] = useSearchParams()
  const payload = useMemo(() => readSharePayload(searchParams.get('data')), [searchParams])
  const activities = useMemo(
    () => payload?.activities.map((activity, index) => sharedToActivity(activity, index)) ?? [],
    [payload],
  )
  const shouldPrint = searchParams.get('print') === '1'

  useEffect(() => {
    if (!shouldPrint || activities.length === 0) return

    const timer = window.setTimeout(() => window.print(), 500)
    return () => window.clearTimeout(timer)
  }, [activities.length, shouldPrint])

  const handleDownload = async () => {
    try {
      await downloadScheduleImage(activities, payload?.title ?? 'Mi semana')
      toast.success('Imagen descargada.')
    } catch (error) {
      toast.error(getErrorMessage(error instanceof Error ? error : null))
    }
  }

  return (
    <div className="activity-share min-h-dvh bg-canvas text-ink print:bg-white">
      <style>{PRINT_STYLE}</style>

      <header className="border-b border-line/70 print:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link to={ROUTES.home} aria-label="Ir a Nottia">
            <LogoWordmark size={26} />
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:inline">
              Vista compartida
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 print:max-w-none print:p-0">
        {payload ? (
          <>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between print:mb-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  Planificación semanal
                </p>
                <h1
                  className="mt-3 text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-ink sm:text-5xl"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  {payload.title || 'Mi semana'}
                </h1>
                <p className="mt-3 text-sm text-muted">
                  {todayLabel()} · {activities.length}{' '}
                  {activities.length === 1 ? 'actividad' : 'actividades'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 print:hidden">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className={buttonClass('secondary')}
                >
                  <PrinterIcon className="h-4 w-4" />
                  Guardar PDF
                </button>
                <button type="button" onClick={() => void handleDownload()} className={buttonClass('primary')}>
                  <DownloadIcon className="h-4 w-4" />
                  Descargar imagen
                </button>
              </div>
            </div>

            <div className="mt-7 print:mt-0">
              {activities.length > 0 ? (
                <ScheduleBoard activities={activities} />
              ) : (
                <div className="rounded-[6px] border border-paper-line bg-paper px-5 py-12 text-center text-paper-ink">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-muted">
                    Sin bloques
                  </p>
                  <p className="mt-2 text-sm text-paper-muted">
                    Esta planificación todavía no tiene actividades.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
              <p className="text-[11px] text-muted">
                El enlace contiene esta planificación y no necesita iniciar sesión.
              </p>
              <Link to={ROUTES.home} className={buttonClass('ghost', 'text-xs')}>
                Volver a Nottia
              </Link>
            </div>
          </>
        ) : (
          <div className="grid min-h-[68dvh] place-items-center">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface px-6 py-10 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Enlace no disponible
              </p>
              <h1
                className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                No encontramos esta planificación
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm text-pretty text-muted">
                Abre la vista desde tu cuenta o pide un enlace nuevo para compartir la semana.
              </p>
              <Link to={ROUTES.home} className={buttonClass('primary', 'mt-6')}>
                Ir a Nottia
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
