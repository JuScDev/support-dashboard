import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['*'],
            },
            {
              sourceTag: 'type:e2e',
              onlyDependOnLibsWithTags: ['type:app'],
            },
            {
              sourceTag: 'type:models',
              onlyDependOnLibsWithTags: ['type:models', 'type:api'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:ui', 'type:models', 'type:api'],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:models', 'type:api'],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:models',
                'type:data-access',
                'type:api',
                'type:ui',
                'type:feature',
              ],
            },
            {
              sourceTag: 'type:api',
              onlyDependOnLibsWithTags: ['type:models', 'type:data-access', 'type:api', 'type:ui'],
            },

            {
              sourceTag: 'domain:core',
              onlyDependOnLibsWithTags: ['domain:core', 'domain:shared', 'type:api'],
            },

            {
              sourceTag: 'domain:shared',
              onlyDependOnLibsWithTags: ['domain:shared', 'domain:core', 'type:api'],
            },

            {
              sourceTag: 'domain:tickets',
              onlyDependOnLibsWithTags: ['domain:tickets', 'domain:core', 'domain:shared'],
            },
            {
              sourceTag: 'domain:dashboard',
              onlyDependOnLibsWithTags: ['domain:dashboard', 'domain:core', 'domain:shared'],
            },
            {
              sourceTag: 'domain:users',
              onlyDependOnLibsWithTags: ['domain:users', 'domain:core', 'domain:shared'],
            },
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../**/src', '../**/src/**', './**/libs', './**/libs/**'],
              message:
                'Import other libraries via their alias (e.g. @support-dashboard/...) instead of relative paths into their src folders.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
