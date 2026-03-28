import { defineConfig } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig(
  ...nextVitals,
  {
    ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}', '.next'],
  },
  {
    rules: {
      'no-console': 'off',
      'curly': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        project: ['./tsconfig.json'],
      },
    },
  }
)
