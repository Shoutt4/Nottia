// API pública de la feature `notebooks` (cuadernos).
export {
  createNotebookRequest,
  fetchNotebook,
  fetchNotebooks,
  updateNotebookRequest,
} from './api/notebooksApi'
export { NotebookCover } from './components/NotebookCover'
export { NotebooksPagination } from './components/NotebooksPagination'
export {
  NOTEBOOKS_PAGE_SIZE,
  notebooksKeys,
  useCreateNotebook,
  useNotebook,
  useNotebooks,
  useUpdateNotebook,
} from './hooks/useNotebooks'
export { coverDesignFrom } from './lib/covers'
export { NotebookDesignerPage } from './pages/NotebookDesignerPage'
export { NotebooksPage } from './pages/NotebooksPage'
export type {
  Notebook,
  NotebookDesignApi,
  NotebookDesignPayload,
  NotebookPage,
  NotebookPayload,
  NotebookResponse,
  PageResponse,
} from './types'
