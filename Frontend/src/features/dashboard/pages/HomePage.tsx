import { useState } from 'react'

import { PencilIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { NotesRail, useNotes } from '@/features/notes'
import { useProfile } from '@/features/profile'

import { BoardSettingsDialog } from '../components/BoardSettingsDialog'
import { CoverBanner } from '../components/CoverBanner'

/** Inicio: portada editable a sangre + notas (por ahora, datos locales). */
export function HomePage() {
  const { data: profile } = useProfile()
  const { notes } = useNotes()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const firstName = profile?.nombre?.trim().split(/\s+/)[0]

  return (
    <div>
      <CoverBanner />

      <div className="mx-auto mt-7 w-full max-w-5xl space-y-10 px-5 sm:px-8">
        <Reveal>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Home</h1>
              <p className="mt-1 text-pretty text-sm text-muted">
                Hola{firstName ? `, ${firstName}` : ''} 👋 Aquí verás todas tus notas.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              aria-label="Editar tablero"
              title="Editar tablero"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <section>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 className="text-sm font-semibold text-ink">Notas</h2>
              <span className="text-xs text-muted">
                {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
              </span>
            </div>

            <NotesRail notes={notes} />
          </section>
        </Reveal>
      </div>

      {settingsOpen && <BoardSettingsDialog onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}
