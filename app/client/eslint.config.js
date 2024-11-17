import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default [
   js.configs.recommended,
   prettierRecommended,
   {
      rules: {
         'prettier/prettier': 'warn'
      }
   },
   ...tseslint.configs.recommended,
   {
      ignores: ['dist'],
   },
   {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
         ecmaVersion: 2020,
         globals: globals.browser
      },
      settings: { react: { version: '18.3' } },
      plugins: {
         react,
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh
      },
      rules: {
         ...js.configs.recommended.rules,
         ...react.configs.recommended.rules,
         ...react.configs['jsx-runtime'].rules,
         ...reactHooks.configs.recommended.rules,
         'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
         'no-unused-vars': [
            'warn',
            {
               argsIgnorePattern: '^_',
               varsIgnorePattern: '^_',
               caughtErrorsIgnorePattern: '^_'
            }
         ],
         '@typescript-eslint/no-unused-vars': ['warn']
      }
   }
];
