import { useQuery } from '@tanstack/react-query'

import { getAdminUsers } from '../api/adminUsersApi'

export const adminUsersKeys = {
  all: ['admin', 'users'] as const,
  list: (page: number) => [...adminUsersKeys.all, page] as const,
}

/** Listado paginado de cuentas para el panel de administración. */
export function useAdminUsers(page: number) {
  return useQuery({
    queryKey: adminUsersKeys.list(page),
    queryFn: () => getAdminUsers(page),
  })
}
