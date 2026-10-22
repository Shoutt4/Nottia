import { useState } from 'react'
import { Outlet, useMatch } from 'react-router-dom'

import { LogoWordmark } from '@/components/brand/LogoWordmark'
import { MenuIcon } from '@/components/ui/icons'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ROUTES } from '@/config/routes'
import { cn } from '@/lib/utils'

import { Sidebar } from './Sidebar'

/**
 * Shell de la zona privada: sidebar fijo + barra superior en móvil + contenido.
 * Se monta alrededor de las rutas privadas, así el menú aparece tras iniciar sesión.
 */
export function SidebarLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  // El editor de notas ocupa el alto disponible y gestiona su propio scroll.
  const isNoteEditor = useMatch(`${ROUTES.notes}/:noteId`) !== null

  return (
    <div className="min-h-dvh bg-canvas text-ink lg:flex">
      <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-canvas/80 px-4 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
          className="grid h-9 w-9 place-items-center rounded-lg text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
        <LogoWordmark size={26} />
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>

      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="min-w-0 flex-1">
        <main
          className={cn(
            'w-full',
            isNoteEditor ? 'h-[calc(100dvh-3.5rem)] lg:h-dvh' : 'py-8',
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
