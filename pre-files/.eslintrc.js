module.exports = {
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react', 'prettier', 'babel'],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
      classes: true,
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    complexity: ['error', 10],
    indent: ['error', 2],
    'babel/new-cap': 1,
    'babel/camelcase': 1,
    'babel/no-invalid-this': 1,
    'babel/object-curly-spacing': 0,
    'babel/quotes': 0,
    'defatul-case': 'off',
    'babel/semi': 1,
    'babel/valid-typeof': 1,
    'react/static-property-placement': 0,
    'react/state-in-constructor': 0,
    'react/prop-types': 1,
    'no-unused-vars': ['error'], // This will flag unused variables
    'unused-imports/no-unused-imports': 'error', // This will flag unused imports
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
