import { useUiStore } from '@/stores/uiStore'

/**
 * Estado del menú lateral.
 *
 * - `collapsed` es persistido (`uiStore`) → se recuerda entre recargas.
 * - El estado del drawer móvil es local y lo maneja `SidebarLayout`.
 */
export function useSidebar() {
  const collapsed = useUiStore((state) => state.sidebarCollapsed)
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)

  return { collapsed, toggleSidebar }
}
