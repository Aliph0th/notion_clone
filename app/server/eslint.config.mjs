import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
   { files: ['**/*.{js,mjs,cjs,ts}'] },
   { languageOptions: { globals: globals.browser } },
   pluginJs.configs.recommended,
   prettierRecommended,
   {
      rules: {
         'prettier/prettier': 'warn'
      }
   },
   ...tseslint.configs.recommended,
   { ignores: ['dist'], rules: { '@typescript-eslint/no-unused-vars': 'warn' } }
];
