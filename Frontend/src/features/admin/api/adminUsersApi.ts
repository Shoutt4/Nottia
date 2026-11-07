import { isAxiosError } from 'axios'

import { http } from '@/config'

import type { AdminUserPage } from '../types'

/** Cuentas por página en el panel de administración. */
export const ADMIN_USERS_PAGE_SIZE = 10
export const ADMIN_USERS_SORT = 'nombre,asc'

function emptyPage(page: number, size: number): AdminUserPage {
  return {
    content: [],
    totalElements: 0,
    totalPages: 0,
    size,
    number: page,
    numberOfElements: 0,
    first: true,
    last: true,
    empty: true,
  }
}

/**
 * `GET /api/usuarios/all` — cuentas con rol `USUARIO`, paginadas.
 * El backend responde 404 cuando todavía no hay ninguna cuenta; para el panel
 * eso es un listado vacío, no un error.
 */
export async function getAdminUsers(
  page: number,
  size = ADMIN_USERS_PAGE_SIZE,
): Promise<AdminUserPage> {
  try {
    const { data } = await http.get<AdminUserPage>('/api/usuarios/all', {
      params: { page, size, sort: ADMIN_USERS_SORT },
    })

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return emptyPage(page, size)
    }

    throw error
  }
}
