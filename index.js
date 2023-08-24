const standardOverrides = {
  semi: 'off',
  'no-dupe-class-members': 'off',
  'space-before-function-paren': 'off',
  'arrow-body-style': ['error', 'as-needed']
};

module.exports = {
  extends: 'semistandard',
  rules: standardOverrides,
  overrides: [
    {
      files: '**/*.ts',
      extends: 'standard-with-typescript',
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        ...standardOverrides,
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: { delimiter: 'semi' },
            singleline: { delimiter: 'semi' }
          }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/space-before-function-paren': ['error', {'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always'}]
      }
    }
  ]
};
