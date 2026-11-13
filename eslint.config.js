module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { require: 'readonly', module: 'readonly', process: 'readonly', console: 'readonly' }
    },
    rules: { 'no-unused-vars': 'error', 'no-undef': 'error' }
  }
];