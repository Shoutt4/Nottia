import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Todo dato de la API debe tener su interfaz: nada de `any` ni `unknown`.
      '@typescript-eslint/no-explicit-any': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSAnyKeyword',
          message: 'No uses `any`: declara una interfaz o un tipo.',
        },
        {
          selector: 'TSUnknownKeyword',
          message: 'No uses `unknown`: declara una interfaz o un tipo.',
        },
      ],
      // Archivos cortos: si pasa de 300 líneas, se parte en componentes/hooks.
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    },
  },
])
