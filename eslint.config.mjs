import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintPluginImport = (await import('eslint-plugin-import')).default;

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        plugins: {
            import: eslintPluginImport,
        },
        rules: {
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                    pathGroups: [
                        { pattern: 'react', group: 'external', position: 'before' },
                        { pattern: '@app/**', group: 'internal', position: 'after' },
                        { pattern: '@modules/**', group: 'internal', position: 'after' },
                        { pattern: '@features/**', group: 'internal', position: 'after' },
                        { pattern: '@shared/**', group: 'internal', position: 'after' },
                        { pattern: '@types/**', group: 'internal', position: 'after' },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],

            'no-restricted-imports': [
                'error',
                {
                    patterns: ['../*', '../../*', '../../../*'],
                },
            ],
        },
        settings: {
            'import/resolver': {
                typescript: {},
            },
        },
        ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**', '**/out/**', '**/coverage/**'],
    },
];

export default eslintConfig;
